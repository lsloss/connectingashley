import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildSubcategoryList } from './builders/buildSubcategoryList';
import { buildRouteList } from './builders/buildRouteList';

export function initMobileTabs(mapState, controller, bottomSheetAPI, panel) {
    const { filters, config } = mapState;
    const container = document.getElementById("map-filters");

    // -------------------------
    // Routes tab
    // -------------------------
    const { group: routesGroup, header: routesHeader } = buildCategoryGroup('Routes', { label: 'Routes' });

    const title = document.createElement('h3');
    title.innerHTML = "Routes";

    routesHeader.addEventListener('click', () => {
        panel.replaceChildren(
            title,
            buildRouteList(
            mapState.routes,
            mapState.uiState,
            (routeId, checked) => {
                if (checked) {
                    controller.showRoute(routeId);
                } else {
                    controller.hideRoute(routeId);
                }
            }
        )
    );

        panel.classList.add('open');
        bottomSheetAPI?.expandToMid?.();
    });

    container.appendChild(routesGroup);

    // -------------------------
    // Category tabs
    // -------------------------
    Object.entries(filters).forEach(([category, data]) => {
        const { group, header } = buildCategoryGroup(category, data, config);

        const title = document.createElement('h3');
        title.innerHTML = data.label;

        header.addEventListener('click', () => {
            panel.replaceChildren(
                title,
                buildSubcategoryList(
                    category,
                    data,
                    config,
                    controller,
                    mapState.uiState
                )
            );

            panel.classList.add('open');
            bottomSheetAPI?.expandToMid?.();
        });

        container.appendChild(group);
    });
}