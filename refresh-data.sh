#!/bin/bash

# Script to refresh places.json and individual place detail files from the Norman Sicily API
# Usage: ./refresh-data.sh

set -e  # Exit on error, but we'll handle specific errors manually

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_BASE_URL="https://api.normansicily.org"
DATA_DIR="src/data"
PLACE_DETAILS_DIR="$DATA_DIR/place-details"

# HTTP headers as array for curl
declare -a HEADERS=(
    "-H" "accept: application/json, text/plain, */*"
    "-H" "accept-language: en-US,en;q=0.8"
    "-H" "cache-control: no-cache"
    "-H" "dnt: 1"
    "-H" "origin: https://normansicily.org"
    "-H" "pragma: no-cache"
    "-H" "priority: u=1, i"
    "-H" "referer: https://normansicily.org/"
    "-H" "sec-ch-ua: \"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Brave\";v=\"140\""
    "-H" "sec-ch-ua-mobile: ?0"
    "-H" "sec-ch-ua-platform: \"macOS\""
    "-H" "sec-fetch-dest: empty"
    "-H" "sec-fetch-mode: cors"
    "-H" "sec-fetch-site: same-site"
    "-H" "sec-gpc: 1"
    "-H" "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
)

# Function to make API call with retry logic
make_api_call() {
    local url="$1"
    local output_file="$2"
    local max_retries=1
    local attempt=0

    while [ $attempt -le $max_retries ]; do
        echo "Attempting to fetch: $url (attempt $((attempt + 1)))"

        if curl -s --fail "${HEADERS[@]}" "$url" > "$output_file.tmp"; then
            # Validate JSON
            if jq empty "$output_file.tmp" 2>/dev/null; then
                mv "$output_file.tmp" "$output_file"
                echo -e "${GREEN}✓ Successfully fetched: $url${NC}"
                return 0
            else
                echo -e "${RED}✗ Invalid JSON received from: $url${NC}"
                rm -f "$output_file.tmp"
            fi
        else
            echo -e "${YELLOW}⚠ Failed to fetch: $url${NC}"
            rm -f "$output_file.tmp"
        fi

        attempt=$((attempt + 1))
        if [ $attempt -le $max_retries ]; then
            echo "Retrying in 2 seconds..."
            sleep 2
        fi
    done

    echo -e "${RED}✗ Failed to fetch after $((max_retries + 1)) attempts: $url${NC}"
    return 1
}

# Create directories if they don't exist
mkdir -p "$DATA_DIR"
mkdir -p "$PLACE_DETAILS_DIR"

echo -e "${GREEN}Starting data refresh...${NC}"
echo "Target directory: $DATA_DIR"
echo "Place details directory: $PLACE_DETAILS_DIR"
echo ""

# Step 1: Fetch places.json
echo -e "${GREEN}Step 1: Fetching places list...${NC}"
if make_api_call "$API_BASE_URL/places" "$DATA_DIR/places.json"; then
    place_count=$(jq length "$DATA_DIR/places.json")
    echo -e "${GREEN}✓ places.json updated successfully ($place_count places)${NC}"
else
    echo -e "${RED}✗ Failed to update places.json${NC}"
    exit 1
fi

echo ""

# Step 2: Fetch individual place details
echo -e "${GREEN}Step 2: Fetching individual place details...${NC}"

# Counter for tracking progress
total_places=$(jq length "$DATA_DIR/places.json")
success_count=0
failed_count=0
failed_places=()

# Process each place
for i in $(seq 0 $((total_places - 1))); do
    # Extract place info using jq
    place_type=$(jq -r ".[$i].nsp_placeType" "$DATA_DIR/places.json")
    place_id=$(jq -r ".[$i].nsp_id" "$DATA_DIR/places.json")
    place_iri=$(jq -r ".[$i].iri" "$DATA_DIR/places.json")

    if [ "$place_type" == "null" ] || [ "$place_id" == "null" ]; then
        echo -e "${YELLOW}⚠ Skipping place with missing type or ID at index $i${NC}"
        failed_count=$((failed_count + 1))
        failed_places+=("Index $i: missing type or ID")
        continue
    fi

    # Construct API URL and output filename
    api_url="$API_BASE_URL/places/$place_type/$place_id"
    output_file="$PLACE_DETAILS_DIR/${place_type}_${place_id}.json"

    echo "[$((i + 1))/$total_places] Processing: $place_type/$place_id"

    if make_api_call "$api_url" "$output_file"; then
        success_count=$((success_count + 1))
    else
        failed_count=$((failed_count + 1))
        failed_places+=("$place_type/$place_id")
    fi

    # Brief pause to be respectful to the API
    sleep 0.1
done

echo ""
echo -e "${GREEN}Data refresh completed!${NC}"
echo -e "${GREEN}✓ Successfully fetched: $success_count places${NC}"

if [ $failed_count -gt 0 ]; then
    echo -e "${RED}✗ Failed to fetch: $failed_count places${NC}"
    echo -e "${YELLOW}Failed places:${NC}"
    printf '%s\n' "${failed_places[@]}"
fi

echo ""
echo "Summary:"
echo "- places.json: $(ls -lh "$DATA_DIR/places.json" | awk '{print $5}')"
echo "- Place detail files: $(find "$PLACE_DETAILS_DIR" -name "*.json" | wc -l) files"
echo "- Total directory size: $(du -sh "$DATA_DIR" | awk '{print $1}')"

echo ""
echo -e "${GREEN}Data refresh script completed!${NC}"
