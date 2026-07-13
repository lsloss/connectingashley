import '../scss/styles.scss';
import { initMap } from './components/mapInit';
import { createFilterController } from './ui/filterController';
//import { initMobileTabs } from './ui/mobileTabs';
import { initBottomSheet } from './ui/mobilePanel';
//import { initDesktopFilters } from './ui/desktopFilters';
import { initMapFilters } from './ui/mapFilters';

import sprite from '../images/icons/iconSprite.svg?raw';

document.body.insertAdjacentHTML('afterbegin', sprite);

const mapId = 'map';
const csvUrl = '/wp-content/uploads/mapdata/Ashley-Map-DataMarkers-only.csv';
const routesUrl = '/wp-content/uploads/mapdata/routes.geojson';

async function boot() {
  const mapState = await initMap(mapId, csvUrl, routesUrl);
  const controller = createFilterController(mapState);
  const mobile = window.matchMedia("(max-width:768px)");
  const bottomSheetAPI = initBottomSheet(mapState.map);

  initMapFilters(mapState, controller, bottomSheetAPI);

  // if (mobile.matches) {
  //   initMobileTabs( mapState, controller, bottomSheetAPI );
  // } else {
  //   initDesktopFilters( mapState, controller );
  // }
}

boot();