import { lightenHex, getContrastColor } from './colour';

export function getLightenAmount(index, total) {
  if (total <= 1) {
    return 0;
  }

  const t = index / (total - 1);

  return Math.pow(t, 0.75) * 0.9;
}

export function getSubcategoryColour(baseColor, subcategory, allSubcategories) {
  const sorted = [...allSubcategories].sort();

  const index = sorted.findIndex(
    s => s.toLowerCase() === subcategory.toLowerCase()
  );

  const amount = getLightenAmount(
    index,
    sorted.length
  );

  return lightenHex(baseColor, amount);
}

export function getSubcategoryTextColour(baseColor, subcategory, allSubcategories) {
  return getContrastColor(
    getSubcategoryColour(
      baseColor,
      subcategory,
      allSubcategories
    )
  );
}