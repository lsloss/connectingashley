import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildSubcategoryList } from './builders/buildSubcategoryList';
import { buildRouteList } from './builders/buildRouteList';

export function initMobileTabs(mapState, controller, bottomSheetAPI) {
    const { filters, config } = mapState;
    const container = document.getElementById("map-filters");
    const panel = document.getElementById("filter-categories");

    // -------------------------
    // Routes tab
    // -------------------------
    const { group: routesGroup, header: routesHeader } = buildCategoryGroup('Routes', { label: 'Routes' });

    routesHeader.addEventListener('click', () => {
        panel.replaceChildren(
            buildRouteList(mapState.routes, controller, mapState.uiState)
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

        header.addEventListener('click', () => {
            panel.replaceChildren(
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