export function buildRoutes(container, routeSystem) {
  const heading = document.createElement('h3');
  const list = document.createElement('ul');

  heading.textContent = 'Routes';
  list.className = 'route-list';

  Object.entries(routeSystem.routes).forEach(([routeId, group]) => {
    const row = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    
    input.type = 'checkbox';
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

  container.appendChild(heading);
  container.appendChild(list);
}