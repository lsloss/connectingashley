import { initDesktopFilters } from './desktopFilters';
import { initMobileTabs } from './mobileTabs';
import { createUiState } from './builders/state/uiState';

export function initMapFilters(mapState, controller, bottomSheetAPI) {
    const container = document.getElementById('map-filters');
    const media = window.matchMedia('(max-width: 768px)');

    function render() {
        container.replaceChildren();

        if (media.matches) {
            initMobileTabs(mapState, controller, bottomSheetAPI);
        } else {
            initDesktopFilters(mapState, controller);
        }
    }

    render();

    media.addEventListener('change', () => {
        render();
    });
}