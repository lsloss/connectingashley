import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildRouteList } from './builders/buildRouteList';

export function buildRoutes(container, routeSystem, uiState) {
  const { group, header } = buildCategoryGroup('Routes', { label: 'Routes' });
  const list = buildRouteList(routeSystem, uiState);
  
  group.appendChild(list);
  container.appendChild(group);

  header.addEventListener('click', () => {
    list.dataset.collapsed = list.dataset.collapsed === 'true' ? 'false' : 'true';
    header.setAttribute('aria-expanded', list.dataset.collapsed === 'true' ? 'false' : 'true');
  });
}