import 'leaflet/dist/leaflet.css';
import L, { Map, TileLayer, Marker, Circle, Popup } from 'leaflet';
import Papa from 'papaparse';
import { createPinSystem } from './mapPins';

/**
 * Initialize Leaflet map
 * @param {string} mapId - ID of the map container
 * @param {string} csvUrl - URL of the CSV file with marker data
 */
export async function initMap(mapId, csvUrl) {
  const map = new Map(mapId, {
    center: [51.46026797028369, -2.4938235644193383],
    zoom: 13
  });

  const { getIcon } = createPinSystem();

  new TileLayer('//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Fetch CSV from server
  try {
    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error('CSV not found');
    const csvText = await res.text();

    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    parsed.data.forEach(row => {
        const markerCoords = row["Coordinates"];
        const markerCoordsSplit = markerCoords.split(", ");

        const lat = parseFloat(markerCoordsSplit[0]);;
        const lng = parseFloat(markerCoordsSplit[1]);;
        const name = row.Name;
        const category = row.Category.trim().toLowerCase().replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
        const subcategory = row["Sub category"];

      if (!isNaN(lat) && !isNaN(lng)) {
       new Marker([lat, lng], {
        icon: getIcon(category, subcategory)
      })
          .bindPopup(name)
          .addTo(map);
      }
    });
  } catch (err) {
    console.error('Failed to load CSV:', err);
  }

  return map;
}