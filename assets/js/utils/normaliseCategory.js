export function normaliseCategory(str) {
  return str
    ?.trim()
    .replace(/[-_\s]+(.)?/g, (_, c) =>
      c ? c.toUpperCase() : ''
    );
}