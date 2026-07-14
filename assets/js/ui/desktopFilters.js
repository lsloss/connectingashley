import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildSubcategoryList } from './builders/buildSubcategoryList';
import { buildRouteList } from './builders/buildRouteList';

export function initDesktopFilters(mapState, controller) {
  const { filters, config, routes } = mapState;
  const container = document.getElementById("map-filters");

  // =====================
  // BUILD ROUTES
  // =====================
    const { group, header } = buildCategoryGroup('Routes', { label: 'Routes' });
    const list = buildRouteList(
      mapState.routes,
      mapState.uiState,
      (routeId, checked) => {
          if (checked) {
              controller.showRoute(routeId);
          } else {
              controller.hideRoute(routeId);
          }

      }
  );
    
    group.appendChild(list);
    container.appendChild(group);
  
    header.addEventListener('click', () => {
      header.setAttribute('aria-expanded', list.dataset.collapsed === 'true' ? 'true' : 'false');
      list.dataset.collapsed = list.dataset.collapsed === 'true' ? 'false' : 'true';
    });

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
