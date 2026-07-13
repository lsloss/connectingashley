import { DivIcon } from 'leaflet';
import { normaliseCategory } from '../utils/normaliseCategory';
import { categoryConfig } from '../config/categories';
import { lightenHex, getContrastColor } from '../utils/colour';
import { getSubcategoryColour } from '../utils/categoryColours';
import { createMarkerSvg, createSymbolContent } from '../utils/markerSvg';

export function createPinSystem(data) {
  const iconCache = new Map();
  const lightnessCache = new Map();

  // -----------------------------
  // BUILD SUBCATEGORY MAP
  // -----------------------------
  const subcategoriesByCategory = new Map();

  data.forEach(row => {
    const category = normaliseCategory(row.Category);
    const subcategory = row["Sub category"]?.trim();

    if (!category || !subcategory) return;

    if (!subcategoriesByCategory.has(category)) {
      subcategoriesByCategory.set(category, new Set());
    }

    subcategoriesByCategory.get(category).add(subcategory);
  });

  // Convert sets → sorted arrays
  for (const [category, set] of subcategoriesByCategory.entries()) {
    subcategoriesByCategory.set(category, [...set].sort());
  }

  // -----------------------------
  // ICON CREATION
  // -----------------------------
  function createIcon(category, subcategory) {
    const config = categoryConfig?.[category];

    if (!config) {
      console.warn('Missing category config:', category);
      return new DivIcon({
        className: '',
        html: ''
      });
    }

    const color = getSubcategoryColour(
      config.baseColor,
      subcategory,
      subcategoriesByCategory.get(category)
    );

    const iconColor = getContrastColor(color);

    return new DivIcon({
      className: '',
      iconSize: [36, 46],
      html: createMarkerSvg({
        fill: color,
        contentColor: iconColor,
        content: createSymbolContent(config.symbol)
      })
    });
  }

  // -----------------------------
  // ICON CACHE
  // -----------------------------
  function getIcon(category, subcategory) {
    const key = `${category}:${subcategory}`;

    if (!iconCache.has(key)) {
      iconCache.set(key, createIcon(category, subcategory));
    }

    return iconCache.get(key);
  }

  return { getIcon };
}