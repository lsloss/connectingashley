export function lightenHex(hex, amount = 0.2) {
  const num = parseInt(hex.replace('#', ''), 16);

  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r = Math.round(r + (255 - r) * amount);
  g = Math.round(g + (255 - g) * amount);
  b = Math.round(b + (255 - b) * amount);

  return (
    '#' +
    [r, g, b]
      .map(v => v.toString(16).padStart(2, '0'))
      .join('')
  );
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