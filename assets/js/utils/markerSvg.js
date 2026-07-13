export function createMarkerSvg({ fill, content, contentColor = '#fff' }) {
  return `
    <svg viewBox="0 0 63.08 76.5">

      <circle
        cx="31.54"
        cy="31.54"
        r="31.54"
        fill="${fill}"
      />

      ${content(contentColor)}

      <polyline
        points="40.55 60.79 31.68 76.5 22.8 60.79"
        fill="${fill}"
      />

    </svg>
  `;
}

export function createSymbolContent(symbol) {
  return colour => `
    <svg x="12" y="12" width="37" height="37">
      <use
        href="#${symbol}"
        fill="${colour}"
      />
    </svg>
  `;
}

export function createNumberContent(number) {
  return colour => `
    <text
      x="31.54"
      y="31.54"
      dy=".08em"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="${colour}"
      font-family="National Park"
      font-size="24"
      font-weight="700"
    >
      ${number}
    </text>
  `;
}