import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker } from 'leaflet';
import Papa from 'papaparse';
import { createPinSystem } from './mapPins';

export async function initMap(mapId, csvUrl) {
  const map = new Map(mapId, {
    center: [51.469511811900325, -2.582901596426167],
    zoom: 16
  });

  new TileLayer('//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  try {
    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error('CSV not found');

    const csvText = await res.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    // ✅ build pin system FIRST
    const pinSystem = createPinSystem(parsed.data);
    const { getIcon } = pinSystem;

    parsed.data.forEach(row => {
      const coords = row["Coordinates"]?.split(", ");
      if (!coords) return;

      const lat = parseFloat(coords[0]);
      const lng = parseFloat(coords[1]);

      const name = row.Name;

      const category = row.Category
        ?.trim()
        .replace(/[-_\s]+(.)?/g, (_, c) =>
          c ? c.toUpperCase() : ''
        );

      const subcategory = row["Sub category"]?.trim();

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