import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, LatLngBounds } from 'leaflet';
import Papa from 'papaparse';
import { createPinSystem } from './mapPins';
import { normaliseCategory } from '../utils/normaliseCategory';
import { categoryConfig } from '../config/categories';
import { createUiState } from '../ui/builders/state/uiState';
import { createRouteSystem } from './mapRoutes';

export async function initMap(mapId, csvUrl, routesUrl) {
  const ashleyBounds = new LatLngBounds(
    [51.37, -2.72], // South West
    [51.53, -2.49]  // North East
  );

  const map = new Map(mapId, {
    center: [51.469511811900325, -2.582901596426167],
    zoom: 16,
    maxBounds: ashleyBounds,
    maxBoundsViscosity: 1.0
  });

  new TileLayer('https://api.mapbox.com/styles/v1/lucymothership/cmrm34jx400gc01qrbbi1hb87/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVjeW1vdGhlcnNoaXAiLCJhIjoid0pqX1dSayJ9.PoE2cD3dIum9R1i4Yh5QZw', {
    maxZoom: 19,
    minZoom: 12,
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // =========================
  // LOAD ROUTES
  // =========================
  const routeRes = await fetch(routesUrl);
  if (!routeRes.ok) throw new Error('Routes GeoJSON not found');

  const geojson = await routeRes.json();
  const routeSystem = createRouteSystem(geojson, map);

  // =========================
  // LOAD CSV MARKERS
  // =========================
  const csvRes = await fetch(csvUrl);
  if (!csvRes.ok) throw new Error('CSV not found');

  const csvText = await csvRes.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  const pinSystem = createPinSystem(parsed.data);
  const { getIcon } = pinSystem;

  const filterTree = {};
  const markerTree = {};

  parsed.data.forEach(row => {
    const coords = row["Coordinates"]?.split(", ");
    if (!coords) return;

    const lat = parseFloat(coords[0]);
    const lng = parseFloat(coords[1]);

    if (isNaN(lat) || isNaN(lng)) return;

    const name = row.Name;
    const category = normaliseCategory(row.Category);
    const subcategory = row["Sub category"]?.trim();
    const description = row.Description;
    const image = row['Image embed'];

    if (!category || !subcategory) return;

    // -------------------------
    // FILTER TREE
    // -------------------------
    if (!filterTree[category]) {
      filterTree[category] = {
        label: row.Category,
        subcategories: {}
      };
    }

    filterTree[category].subcategories[subcategory] =
      (filterTree[category].subcategories[subcategory] || 0) + 1;

    // -------------------------
    // MARKER TREE
    // -------------------------
    if (!markerTree[category]) {
      markerTree[category] = {};
    }

    if (!markerTree[category][subcategory]) {
      markerTree[category][subcategory] = [];
    }

    const marker = new Marker([lat, lng], {
      icon: getIcon(category, subcategory)
    }).bindPopup(`
      <h3>${name}</h3>
      ${description ? `<p>${description}</p>` : ''}
      ${image ? `<p>${image}</p>` : ''}
      `);

    markerTree[category][subcategory].push(marker);
  });

  const uiState = createUiState();

  return {
    map,
    markers: markerTree,
    routes: routeSystem,
    filters: filterTree,
    config: categoryConfig,
    uiState: uiState
  };
}