import { buildSubcategoryRow } from './buildSubcategoryRow';

export function buildRouteList(routeSystem, controller, uiState) {
    const list = document.createElement('ul');

    list.className = 'filter-list route-list';
    list.dataset.collapsed = 'true';

    Object.entries(routeSystem.routes).forEach(([routeId, group]) => {
        const { row, input } = buildSubcategoryRow(
        "Routes",
        group.routeName,
        null,
        null,
        null,
        { showCount: false }
        );

        input.checked = uiState.selectedRoute === routeId;

        list.appendChild(row);

        input.addEventListener('change', () => {
        uiState.selectedRoute = routeId;

        if (input.checked) {
            Object.keys(routeSystem.routes).forEach(id => {
            if (id !== routeId) routeSystem.hide(id);
            });

            list.querySelectorAll('input').forEach(i => {
            if (i !== input) i.checked = false;
            });

            controller.showRoute(routeId);
        } else {
            controller.hideRoute(routeId);
        }
        });
    });

    return list;
}