import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildSubcategoryList } from './builders/buildSubcategoryList';
import { buildRoutes } from './routeFilters';
import { createUiState } from './builders/state/uiState';

export function initDesktopFilters(mapState, controller) {
  const { filters, config, routes } = mapState;
  const container = document.getElementById("map-filters");

  // =====================
  // BUILD ROUTES
  // =====================
  buildRoutes(container, mapState.routes);

  // =====================
  // CATEGORIES
  // =====================
  Object.entries(filters).forEach(([category, data]) => {
    const { group, header } = buildCategoryGroup(category, data, config);
    
    const subList = buildSubcategoryList( category, data, config, controller, mapState.uiState );

    subList.dataset.collapsed = 'true';
    group.appendChild(subList);
    container.appendChild(group);

    header.addEventListener('click', () => {
      header.setAttribute('aria-expanded', subList.dataset.collapsed === 'true' ? 'true' : 'false');
      subList.dataset.collapsed = subList.dataset.collapsed === 'true' ? 'false' : 'true';
    });
  });
}
