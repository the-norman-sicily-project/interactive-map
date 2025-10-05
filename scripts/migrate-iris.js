#!/usr/bin/env node

/**
 * Migration script to convert fragment-based IRIs to slash-based IRIs
 *
 * Old format: http://www.normansicily.org/nsp#monastery164
 * New format: http://www.normansicily.org/nsp/place/monastery/164
 *
 * Also converts:
 * - http://www.normansicily.org/cssi#assessment26 -> http://www.normansicily.org/cssi/assessment/26
 * - Keeps external IRIs (zotero.org, example.com/genealogy.owl) unchanged
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// IRI transformation rules
const transformIRI = (iri) => {
  if (!iri || typeof iri !== 'string') return iri;

  // Norman Sicily Project places: nsp#monastery164 -> nsp/place/monastery/164
  const nspPlaceMatch = iri.match(/^http:\/\/www\.normansicily\.org\/nsp#([a-z]+)(\d+)$/);
  if (nspPlaceMatch) {
    const [, placeType, id] = nspPlaceMatch;
    return `http://www.normansicily.org/nsp/place/${placeType}/${id}`;
  }

  // CSSI assessments: cssi#assessment26 -> cssi/assessment/26
  const cssiMatch = iri.match(/^http:\/\/www\.normansicily\.org\/cssi#([a-z]+)(\d+)$/);
  if (cssiMatch) {
    const [, entityType, id] = cssiMatch;
    return `http://www.normansicily.org/cssi/${entityType}/${id}`;
  }

  // Keep external IRIs unchanged (zotero, example.com, geonames, etc.)
  return iri;
};

// Recursively transform all IRI values in an object
const transformObject = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return transformIRI(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(transformObject);
  }

  if (typeof obj === 'object') {
    const transformed = {};
    for (const [key, value] of Object.entries(obj)) {
      // Special handling for 'iri' fields
      if (key === 'iri') {
        transformed[key] = transformIRI(value);
      } else {
        transformed[key] = transformObject(value);
      }
    }
    return transformed;
  }

  return obj;
};

// Process a single JSON file
const processFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    const transformed = transformObject(data);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(transformed));

    console.log(`✓ Processed: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
};

// Main execution
const main = () => {
  const dataDir = path.join(__dirname, '../public/data');

  console.log('Starting IRI migration...\n');

  // Find all JSON files in data directory
  const jsonFiles = glob.sync('**/*.json', {
    cwd: dataDir,
    absolute: true,
  });

  console.log(`Found ${jsonFiles.length} JSON files to process\n`);

  let successCount = 0;
  let failCount = 0;

  jsonFiles.forEach((filePath) => {
    if (processFile(filePath)) {
      successCount++;
    } else {
      failCount++;
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log(`Migration complete!`);
  console.log(`  Success: ${successCount} files`);
  console.log(`  Failed:  ${failCount} files`);
  console.log('='.repeat(50));

  if (failCount > 0) {
    process.exit(1);
  }
};

main();
