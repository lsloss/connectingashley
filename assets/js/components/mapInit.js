import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker } from 'leaflet';
import Papa from 'papaparse';
import { normaliseCategory } from '../utils/normaliseCategory';
import { categoryConfig } from '../config/categories';
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

    // =========================
    // FILTER STRUCTURE
    // =========================
    const filterTree = {};
    const markerTree = {};

    parsed.data.forEach(row => {
      const coords = row["Coordinates"]?.split(", ");
      if (!coords) return;

      const lat = parseFloat(coords[0]);
      const lng = parseFloat(coords[1]);

      const name = row.Name;

      const category = normaliseCategory(row.Category);

      const categoryLabel = row.Category;
      const subcategory = row["Sub category"]?.trim();

      if (isNaN(lat) || isNaN(lng)) return;

      // =========================
      // BUILD FILTER TREE
      // =========================
      if (!filterTree[category]) {
        filterTree[category] = {
          label: categoryLabel,
          subcategories: {}
        };
      }

      if (!filterTree[category].subcategories[subcategory]) {
        filterTree[category].subcategories[subcategory] = 0;
      }

      filterTree[category].subcategories[subcategory]++;

      // =========================
      // BUILD MARKER TREE
      // =========================
      if (!markerTree[category]) {
        markerTree[category] = {};
      }

      if (!markerTree[category][subcategory]) {
        markerTree[category][subcategory] = [];
      }

      const marker = new Marker([lat, lng], {
        icon: getIcon(category, subcategory)
      }).bindPopup(name);

      markerTree[category][subcategory].push(marker);
    });

    const mapState = {
      map,
      markers: markerTree,
      filters: filterTree,
      config: categoryConfig
  };

  window.__mapState = mapState;

  } catch (err) {
    console.error('Failed to load CSV:', err);
  }

  return map;
}