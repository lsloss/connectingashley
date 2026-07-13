import { GeoJSON, FeatureGroup, DivIcon, Marker } from 'leaflet';
import { createMarkerSvg, createNumberContent, createSymbolContent } from '../utils/markerSvg';

function createNumberIcon(num) {
  return new DivIcon({
    className: 'route-number-marker',
    iconSize: [36, 46],
    html: createMarkerSvg({
      fill: 'black',
      content: createNumberContent(num)
    })
  });
}

function createFacilityIcon() {
  return new DivIcon({
    className: 'route-facility-marker',
    iconSize: [36, 46],
    html: createMarkerSvg({
    fill: 'black',
    content: createSymbolContent('Facility')
  })
  });
}

export function createRouteSystem(geojson, map) {
  const routes = {};

  geojson.features.forEach(feature => {
    const routeId = feature.properties?.routeId;
    if (!routeId) return;

    if (!routes[routeId]) {
      routes[routeId] = new FeatureGroup();
      routes[routeId].routeName = feature.properties?.name || routeId;
    }

    // =========================
    // POLYGONS (route lines)
    // =========================
    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiPolygon') {
      const layer = new GeoJSON(feature, {
        style: {
          color: '#2b6cb0',
          fillColor: 'transparent',
          weight: 4,
          opacity: 0.9
        }
      });

      routes[routeId].addLayer(layer);
      return;
    }

    // =========================
    // POINTS (stops / POIs)
    // =========================
    if (feature.geometry.type === 'Point') {
      const props = feature.properties || {};

      const icon = props.number
        ? createNumberIcon(props.number)
        : createFacilityIcon();

      const marker = new Marker(
        [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
        { icon }
      );

      if (props.name) {
        marker.bindPopup(`
          <strong>${props.name}</strong>
          ${props.description ? `<p>${props.description}</p>` : ''}
        `);
      }

      routes[routeId].addLayer(marker);
    }
  });

  return {
    routes,

    show(routeId) {
      const layer = routes[routeId];

      if (!layer) return;

      layer.addTo(map);

      map.fitBounds(layer.getBounds(), {
        padding: [40, 40],
        maxZoom: 17
      });
    },

    hide(routeId) {
      const layer = routes[routeId];
      if (layer && map.hasLayer(layer)) map.removeLayer(layer);
    }
  };
}