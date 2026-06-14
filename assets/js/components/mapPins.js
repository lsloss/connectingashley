import { DivIcon } from 'leaflet';
import { normaliseCategory } from '../utils/normaliseCategory';
import { categoryConfig } from '../config/categories';

export function createPinSystem(data) {
  const iconCache = new Map();

  // -----------------------------
  // 2. BUILD SUBCATEGORY MAP
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

  // convert sets → sorted arrays
  for (const [category, set] of subcategoriesByCategory.entries()) {
    subcategoriesByCategory.set(category, [...set].sort());
  }

  // -----------------------------
  // 3. LIGHTNESS FUNCTION
  // -----------------------------
  function getLightness(category, subcategory) {
    const list = subcategoriesByCategory.get(category) || [];

    const index = list.indexOf(subcategory);

    const min = 35;
    const max = 75;

    if (list.length <= 1 || index === -1) return 55;

    return min + ((max - min) * (index / (list.length - 1)));
  }

  // -----------------------------
  // 4. ICON CREATION
  // -----------------------------
  function createIcon(category, subcategory) {
    const config = categoryConfig[category];

    if (!config) {
      console.warn('Missing category config:', category);
      return new DivIcon({ html: '', className: '' });
    }

    const color = `hsl(${config.hue}, 75%, ${getLightness(category, subcategory)}%)`;

    return new DivIcon({
      className: '',
      iconSize: [36, 46],
      html: `
        <svg viewBox="0 0 63.08 76.5">

          <circle
            cx="31.54"
            cy="31.54"
            r="31.54"
            fill="${color}"
          />

          <svg x="12" y="12" width="37" height="37">
            <use href="#${config.symbol}" />
          </svg>

          <polyline
            points="40.55 60.79 31.68 76.5 22.8 60.79"
            fill="${color}"
          />

        </svg>
      `
    });
  }

  // -----------------------------
  // 5. CACHE
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