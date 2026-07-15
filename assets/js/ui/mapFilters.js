import { initDesktopFilters } from './desktopFilters';
import { initMobileTabs } from './mobileTabs';
import { createUiState } from './builders/state/uiState';

function initMobilePopups(mapState, panel, bottomSheetAPI) {

    const media = window.matchMedia('(max-width: 768px)');

    mapState.map.on('popupopen', e => {

        if (!media.matches) return;

        bottomSheetAPI.setPopupOpening(true);

        panel.innerHTML = e.popup.getContent();

        panel.classList.add('open');

        bottomSheetAPI?.expandToMid?.();

        mapState.map.closePopup();
    });
}

export function initMapFilters(mapState, controller, bottomSheetAPI) {
    const container = document.getElementById('map-filters');
    const media = window.matchMedia('(max-width: 768px)');

    function render() {
        container.replaceChildren();

        if (media.matches) {
            const panel = document.getElementById("filter-categories");

            initMobileTabs(mapState, controller, bottomSheetAPI, panel);
            initMobilePopups(mapState, panel, bottomSheetAPI);
        } else {
            initDesktopFilters(mapState, controller);
        }
    }

    render();

    media.addEventListener('change', () => {
        render();
    });
}