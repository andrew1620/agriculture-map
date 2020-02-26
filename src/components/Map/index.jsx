import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { Map as LeafletMap, WMSTileLayer, FeatureGroup, ImageOverlay } from 'react-leaflet';

import './index.css';

import settings from '../../settings';

import CompositeLayer from '../CompositeLayer';
import WithWebSocketConnection from '../WithWebSocketConnection';
import FlightTasksPanel from '../FlightTasksPanel';

import withHocs from '../GraphQLQueries/queriesHoc';

const Map = ({ data }) => {
  const [options, setOptions] = useState(null);
  // console.log('coordsData ---', data.coords); // Те самые координаты в виде двух массивов
  console.log('data ---', data.data);
  const points = {
    origin: [38.793698930945325, -108.02341966559042],
    bbox: [[38.793698930945325, -108.02341966559042], [38.795677118398544, -108.02178074362031]],
    wms: {
      url: 'http://192.168.0.130:14002/geoserver/wms',
      layers: 'real_data:odm_orthophoto',
      tiled: 'true'
    }
  };
  useEffect(() => {
    setOptions({
      origin: new L.LatLng(points.origin[0], points.origin[1]),
      bbox: new L.LatLngBounds(points.bbox[0], points.bbox[1]),
      wms: points.wms,
      layers: []
    });
  }, []);

  // const bounds = [[0, 0], [870, 1280]];
  const bounds = [[0, 0], [600, 1280]];

  return (
    options && (
      <LeafletMap
        id="root-map"
        // bounds={options.bbox}
        maxBounds={bounds}
        // center={options.origin}
        center={[500, 500]}
        zoom={0}
        zoomControl={false}
        mizZoom={-5}
        crs={L.CRS.Simple}
        useFlyTo
      >
        <ImageOverlay url="http://localhost:3005/static/map.png" bounds={bounds} />
      </LeafletMap>
    )
  );
};

export default withHocs(Map);
// useEffect(() => {
//   const requestMapConfig = configUrl => fetch(configUrl).then(response => response.json());
//   requestMapConfig(settings.urls.config)
//     .then(({ origin: [xO, yO], bbox: [luBbox, rbBbox], wms, layers }) => {
//       setOptions({
//         origin: new L.LatLng(xO, yO),
//         bbox: new L.LatLngBounds(luBbox, rbBbox),
//         wms,
//         layers
//       });
//     })
//     .catch(err => {
//       throw err;
//     });
// }, []);
