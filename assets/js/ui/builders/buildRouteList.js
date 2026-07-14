import { buildSubcategoryRow } from './buildSubcategoryRow';

export function buildRouteList(routeSystem, uiState, onChange) {

    const list = document.createElement('ul');

    list.className = 'filter-list route-list';
    list.dataset.collapsed = 'true';

    Object.entries(routeSystem.routes).forEach(([routeId, route]) => {

        const { row, input } = buildSubcategoryRow(
            "Routes",
            route.routeName,
            null,
            null,
            null,
            { showCount: false }
        );

        input.checked = uiState.selectedRoute === routeId;

        input.addEventListener("change", () => {
            uiState.selectedRoute = input.checked
                ? routeId
                : null;

            onChange?.(routeId, input.checked);
        });

        row.appendChild(input.parentElement);

        list.appendChild(row);

    });

    return list;
}