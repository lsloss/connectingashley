//import { getContrastColor } from '../utils/colour';
import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildSubcategoryList } from './builders/buildSubcategoryList';
import { buildRoutes } from './routeFilters';

export function initDesktopFilters(mapState, controller) {
  const { filters, config, routes } = mapState;
  const container = document.getElementById("map-filters");

  const inputRegistry = new Map();

  // =====================
  // CATEGORIES
  // =====================
  Object.entries(filters).forEach(([category, data]) => {
    const { group, header } = buildCategoryGroup(category, data, config);
    
    const subList = buildSubcategoryList( category, data, config, inputRegistry, controller );

    subList.classList.add('collapsed');
    group.appendChild(subList);
    container.appendChild(group);

    header.addEventListener('click', () => {
      subList.classList.toggle('collapsed');
      header.classList.toggle('open');
    });
  });

  // =====================
  // BUILD ROUTES
  // =====================
  buildRoutes(container, mapState.routes);
}
