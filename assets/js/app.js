import '../scss/styles.scss';
import { initMap } from './components/mapInit';
import { createPinSystem } from './components/mapPins';
import { initMapFilters } from './components/mapFilters';

import sprite from '../images/icons/iconSprite.svg?raw';

document.body.insertAdjacentHTML('afterbegin', sprite);

// Map container ID
const mapId = 'map';

// WordPress uploads folder URL
const csvUrl = '/wp-content/uploads/mapdata/Ashley-Map-DataMarkers-only.csv';

// Initialize map
initMap(mapId, csvUrl).then(() => {
  initMapFilters();
});
