export function lightenHex(hex, amount = 0.2) {
  const num = parseInt(hex.replace('#', ''), 16);

  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * amount);
  let b = (num & 0x0000FF) + Math.round(255 * amount);

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  return `rgb(${r}, ${g}, ${b})`;
}

export function getContrastColor(hex) {
  const num = parseInt(hex.replace('#', ''), 16);

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 160 ? '#000000' : '#FFFFFF';
}