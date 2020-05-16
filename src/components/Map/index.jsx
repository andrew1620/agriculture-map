import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import {
  Map as LeafletMap,
  WMSTileLayer,
  FeatureGroup,
  ImageOverlay,
  Rectangle,
  LayersControl
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import './index.css';

import settings from '../../settings';

import CompositeLayer from '../CompositeLayer';
import WithWebSocketConnection from '../WithWebSocketConnection';
import FlightTasksPanel from '../FlightTasksPanel';

import { useQuery } from '@apollo/react-hooks';
import { layerQuery } from '../GraphQLQueries/quaries';
import { Subscription } from 'react-apollo';
import ChangeLayer from '../GraphQLQueries/mutations';
import GetChangedLayer from '../GraphQLQueries/subscription';
import EditableLayerService from '../EditableLayerService';

const Map = () => {
  const [options, setOptions] = useState(null);

  // let rectangle = [[450, 100], [500, 200]];
  const [rectangle, setRectangle] = useState([[100, 100], [500, 200]]);
  const { data, loading, error } = useQuery(layerQuery);

  useEffect(() => {
    if (data) {
      setRectangle(data.layers[0].objects.types[0].format.rectangle);
      // console.log(data);
    }
  }, [data]);

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

  const bounds = [[0, 0], [600, 1280]];

  const { BaseLayer } = LayersControl;

  return (
    options && (
      <LeafletMap
        id="root-map"
        maxBounds={bounds}
        center={[500, 500]}
        zoom={0}
        zoomControl={false}
        mizZoom={-5}
        crs={L.CRS.Simple}
        useFlyTo
      >
        <LayersControl position="topright">
          <BaseLayer checked name="First map">
            <ImageOverlay url="http://localhost:3001/static/map.jpg" bounds={bounds} />
          </BaseLayer>
          <BaseLayer name="Second map">
            <ImageOverlay url="http://localhost:3001/static/map2.jpg" bounds={bounds} />
          </BaseLayer>
        </LayersControl>
        {/* Добавил отображение объектов через контейнер */}
        <EditableLayerService
          options={{
            draw: {
              rectangle: true,
              polyline: false,
              circle: false,
              circlemarker: false,
              polygon: false
            },
            collapsed: false
          }}
          children={() => alert('hi')}
        >
          <GetChangedLayer />
          {/* <Rectangle bounds={rectangle} color="red" />
          <Rectangle bounds={[[515, 436], [475, 397]]} color="red" /> */}
        </EditableLayerService>
        {/* <ChangeLayer /> */}
      </LeafletMap>
    )
  );
};

export default Map;
