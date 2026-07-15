import { FeatureGroup } from "leaflet";

export function createFilterController(mapState) {
  const { map, markers, routes } = mapState;

  function show(category, subcategory) {
    const selectedMarkers = markers[category]?.[subcategory];

    if (!selectedMarkers) return;

    selectedMarkers.forEach(m => m.addTo(map));

    const group = new FeatureGroup(selectedMarkers);
    const isMobile = window.matchMedia('(max-width: 1280px)').matches;

    map.fitBounds(group.getBounds(), {
      paddingTopLeft: [40, 40],
      paddingBottomRight: isMobile
        ? [40, window.innerHeight * 0.40]
        : [40, 40],
      maxZoom: 17
    });
  }

  function hide(category, subcategory) {
    markers[category]?.[subcategory]?.forEach(m =>
      map.removeLayer(m)
    );
  }

  function showCategory(category) {
    Object.values(markers[category] || {})
      .flat()
      .forEach(m => m.addTo(map));
  }

  function hideCategory(category) {
    Object.values(markers[category] || {})
      .flat()
      .forEach(m => map.removeLayer(m));
  }

  function showRoute(routeId) {
    Object.keys(mapState.routes.routes).forEach(id => {
        if (id !== routeId) {
            routes.hide(id);
        }
    });

    routes.show(routeId);
  }

  function hideRoute(routeId) {
    routes.hide(routeId);
  }

  return {
    show,
    hide,
    showCategory,
    hideCategory,
    showRoute,
    hideRoute
  };
}