import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';
import { useTranslate } from 'react-redux-multilingual';
import L from 'leaflet';
import config from '../config';
import './SearchToggleControl.css';

// Custom Leaflet control for the search toggle
const SearchToggleControl = L.Control.extend({
  options: {
    position: 'topright',
  },

  initialize(options) {
    L.setOptions(this, options);
    this.isExpanded = false;
    this.searchInput = null;
    this.searchResults = null;
  },

  onAdd(map) {
    this.map = map;

    // Create the toggle button container
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control search-toggle-control');

    // Create the toggle button
    const button = L.DomUtil.create('a', 'search-toggle-button', container);
    button.href = '#';
    button.title = 'Search';
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', 'Toggle search');

    // Add magnifying glass SVG
    button.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;

    // Prevent map interaction when clicking the button
    L.DomEvent.on(button, 'click', L.DomEvent.stopPropagation)
      .on(button, 'mousedown', L.DomEvent.stopPropagation)
      .on(button, 'dblclick', L.DomEvent.stopPropagation)
      .on(button, 'click', this.toggle, this);

    return container;
  },

  toggle(e) {
    L.DomEvent.preventDefault(e);

    if (this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  },

  expand() {
    if (this.searchInput || !this.options.provider) return;

    this.isExpanded = true;

    // Create custom search container
    const searchContainer = L.DomUtil.create('div', 'custom-search-container');

    // Create search input
    this.searchInput = L.DomUtil.create('input', 'custom-search-input');
    this.searchInput.type = 'text';
    this.searchInput.placeholder = this.options.searchLabel || 'Search...';

    // Create results container
    this.searchResults = L.DomUtil.create('div', 'custom-search-results');

    searchContainer.appendChild(this.searchInput);
    searchContainer.appendChild(this.searchResults);

    // Add to map
    this.map.getContainer().appendChild(searchContainer);

    // Position the search container
    const controlElement = this.getContainer();
    const rect = controlElement.getBoundingClientRect();
    const mapRect = this.map.getContainer().getBoundingClientRect();

    searchContainer.style.position = 'absolute';
    searchContainer.style.top = `${rect.bottom - mapRect.top + 5}px`;
    searchContainer.style.right = `${mapRect.right - rect.right}px`;
    searchContainer.style.zIndex = '1000';

    // Prevent map interactions
    L.DomEvent.disableClickPropagation(searchContainer);
    L.DomEvent.disableScrollPropagation(searchContainer);

    // Add search functionality
    this.setupSearch();

    // Focus the input
    setTimeout(() => {
      this.searchInput.focus();
    }, 100);

    // Update button appearance
    const button = this.getContainer().querySelector('.search-toggle-button');
    if (button) {
      button.style.backgroundColor = '#e6f3ff';
      button.setAttribute('aria-label', 'Hide search');
    }
  },

  setupSearch() {
    let searchTimeout;

    const performSearch = async (query) => {
      if (!query || query.length < 2) {
        this.searchResults.innerHTML = '';
        return;
      }

      try {
        const results = await this.options.provider.search({ query });
        this.displayResults(results);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Search error:', error);
        this.searchResults.innerHTML = '<div class="search-error">Search error occurred</div>';
      }
    };

    // Add input event listener
    L.DomEvent.on(this.searchInput, 'input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(e.target.value);
      }, 300);
    });

    // Add keydown event listener for Enter key
    L.DomEvent.on(this.searchInput, 'keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(searchTimeout);
        performSearch(e.target.value);
      }
    });
  },

  displayResults(results) {
    if (!results || results.length === 0) {
      this.searchResults.innerHTML = '<div class="no-results">No results found</div>';
      return;
    }

    const resultElements = results.slice(0, 10).map((result) => {
      const item = L.DomUtil.create('div', 'search-result-item');
      item.textContent = result.label;

      L.DomEvent.on(item, 'click', () => {
        this.selectResult(result);
      });

      return item;
    });

    this.searchResults.innerHTML = '';
    resultElements.forEach((el) => this.searchResults.appendChild(el));
  },

  selectResult(result) {
    // Fire the same event as the original search
    this.map.fireEvent('geosearch/showlocation', {
      location: result,
    });

    // Auto-collapse after search
    setTimeout(() => this.collapse(), 100);
  },

  collapse() {
    if (!this.searchInput) return;

    this.isExpanded = false;

    // Remove search container
    const searchContainer = this.map.getContainer().querySelector('.custom-search-container');
    if (searchContainer) {
      this.map.getContainer().removeChild(searchContainer);
    }

    this.searchInput = null;
    this.searchResults = null;

    // Update button appearance
    const button = this.getContainer().querySelector('.search-toggle-button');
    if (button) {
      button.style.backgroundColor = '';
      button.setAttribute('aria-label', 'Show search');
    }
  },

  onRemove() {
    if (this.searchInput) {
      this.collapse();
    }
  },
});

// React component wrapper
const SearchToggleControlComponent = memo(({ provider }) => {
  const map = useMap();
  const translate = useTranslate();

  // Handle marker finding and navigation
  const findMarker = useCallback((latlng, layer) => {
    let marker;
    if (layer.getLayers) {
      const childLayers = layer.getLayers();
      for (let i = 0; i < childLayers.length; i += 1) {
        marker = findMarker(latlng, childLayers[i]);
        if (marker) break;
      }
    }
    if (layer.getLatLng) {
      if (latlng.equals(layer.getLatLng())) {
        marker = layer;
      }
    }
    return marker;
  }, []);

  const onShowLocation = useCallback(
    (e) => {
      const latlng = L.latLng(e.location.y, e.location.x);

      let marker;
      let foundMarker = false;
      map.eachLayer((layer) => {
        if ((layer instanceof L.MarkerClusterGroup || layer instanceof L.Marker) && !foundMarker) {
          marker = findMarker(latlng, layer);
          if (marker) {
            foundMarker = true;
          }
        }
      });

      if (marker) {
        let found = false;
        map.eachLayer((layer) => {
          if (!found) {
            if (layer.hasLayer) {
              if (layer.hasLayer(marker)) {
                layer.zoomToShowLayer(marker);
                found = true;
              }
            }
          }
        });
        if (!found) {
          map.setView(latlng, config.searchZoom);
        }

        marker.fireEvent('mouseover');
        marker.openTooltip();
      } else {
        map.setView(latlng, config.searchZoom);
      }
    },
    [map, findMarker],
  );

  // Use proper React-Leaflet event handling
  useEventHandlers({ instance: map }, { 'geosearch/showlocation': onShowLocation });

  useEffect(() => {
    // Add the custom control to the map
    const searchToggleControl = new SearchToggleControl({
      provider,
      searchLabel: translate('searchPrompt'),
    });

    map.addControl(searchToggleControl);

    return () => {
      map.removeControl(searchToggleControl);
    };
  }, [map, provider, translate]);

  return null; // This component doesn't render anything directly
});

SearchToggleControlComponent.displayName = 'SearchToggleControlComponent';

SearchToggleControlComponent.propTypes = {
  provider: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SearchToggleControlComponent;
