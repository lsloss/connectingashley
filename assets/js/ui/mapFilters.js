import { initDesktopFilters } from './desktopFilters';
import { initMobileTabs } from './mobileTabs';
import { createUiState } from './builders/state/uiState';

function initMobilePopups(mapState, panel, bottomSheetAPI) {
    const isMobile = window.matchMedia('(max-width: 1280px)');

    mapState.map.on('popupopen', e => {

        if (!isMobile.matches) return;

        bottomSheetAPI.setPopupOpening(true);

        panel.innerHTML = e.popup.getContent();

        panel.classList.add('open');

        bottomSheetAPI?.expandToMid?.();

        mapState.map.closePopup();
    });
}

export function initMapFilters(mapState, controller, bottomSheetAPI) {
    const container = document.getElementById('map-filters');
    const isMobile = window.matchMedia('(max-width: 1280px)');

    function render() {
        container.replaceChildren();

        if (isMobile.matches) {
            const panel = document.getElementById("filter-categories");

            initMobileTabs(mapState, controller, bottomSheetAPI, panel);
            initMobilePopups(mapState, panel, bottomSheetAPI);
        } else {
            initDesktopFilters(mapState, controller);
        }
    }

    render();

    isMobile.addEventListener('change', () => {
        render();
    });
}