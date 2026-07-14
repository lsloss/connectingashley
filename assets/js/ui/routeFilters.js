import { buildCategoryGroup } from './builders/buildCategoryGroup';

export function buildRoutes(container, routeSystem) {

  const { group, header } = buildCategoryGroup('Routes', { label: 'Routes' });

  const list = document.createElement('ul');

  list.className = 'filter-list route-list';
  list.dataset.collapsed = 'true';

  Object.entries(routeSystem.routes).forEach(([routeId, group]) => {
    const row = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    
    input.type = 'radio';
    label.appendChild(input);
    label.appendChild(document.createTextNode(group.routeName || routeId));
    row.appendChild(label);
    list.appendChild(row);

    input.addEventListener('change', () => {
      if (input.checked) {
        Object.keys(routeSystem.routes).forEach(id => {
          if (id !== routeId) routeSystem.hide(id);
        });

        list.querySelectorAll('input').forEach(i => {
          if (i !== input) i.checked = false;
        });

        routeSystem.show(routeId);
      } else {
        routeSystem.hide(routeId);
      }
    });
  });

  group.appendChild(list);
  container.appendChild(group);

  header.addEventListener('click', () => {
    list.dataset.collapsed = list.dataset.collapsed === 'true' ? 'false' : 'true';
    header.setAttribute('aria-expanded', list.dataset.collapsed === 'true' ? 'false' : 'true');
  });
}