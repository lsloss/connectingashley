export function createUiState() {
  return {
    selectedMarkers: new Set(),
    inputRegistry: new Map(),
    activeCategory: null,
    selectedRoute: null
  };
}