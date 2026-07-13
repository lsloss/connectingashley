import { buildCategoryGroup } from './builders/buildCategoryGroup';
import { buildAllRow } from './builders/buildAllRows';
import { buildSubcategoryRow } from './builders/buildSubcategoryRow';
import { buildSubcategoryList } from './builders/buildSubcategoryList';
import { buildRoutes } from './routeFilters';

export function initMobileTabs(mapState, controller, bottomSheetAPI) {
    const { filters, config, routes } = mapState;
    const container = document.getElementById("map-filters");
    const inputRegistry = new Map();

    // =====================
    // CATEGORIES
    // =====================
    const tabs = document.getElementById("map-filters");
    const panel = document.getElementById("filter-categories");

    Object.entries(filters).forEach(([category, data]) => {
        const { group, header } = buildCategoryGroup( category, data, config);

        header.addEventListener("click", () => {
            panel.replaceChildren(
                buildSubcategoryList( category, data, config, inputRegistry, controller, mapState)
            );
            panel.classList.add("open");

            bottomSheetAPI?.expandToMid?.();
        });

        tabs.appendChild(group);
    });
}