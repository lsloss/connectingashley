export function createFilterController(mapState) {
  const { map, markers, routes } = mapState;

  function show(category, subcategory) {
    markers[category]?.[subcategory]?.forEach(m => m.addTo(map));
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