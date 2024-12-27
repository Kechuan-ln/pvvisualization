import React, { useState, useEffect } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { GeoJsonLayer } from '@deck.gl/layers';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2NobGluIiwiYSI6ImNsc3B4enUyejBrdHMya3FubnlzdWg3bTgifQ._7cs_IWS-OzUWNQhQekWDA'; // 替换为您的 Mapbox 令牌

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 加载 GeoJSON 数据
    fetch('/Users/dongkechuan/Downloads/CHUCK/CHUCK.geojson')
      .then(response => response.json())
      .then(setData);
  }, []);

  const layers = [
    new GeoJsonLayer({
      id: 'buildings',
      data,
      extruded: true,
      getElevation: d => d.properties.height,
      getFillColor: [74, 80, 87],
      getLineColor: [255, 255, 255],
      pickable: true,
    })
  ];

  return (
    <DeckGL
      initialViewState={{
        longitude: 114.18,
        latitude: 22.69,
        zoom: 15,
        pitch: 45,
        bearing: 0,
      }}
      controller={true}
      layers={layers}
    >
      <Map mapboxApiAccessToken={MAPBOX_TOKEN} />
    </DeckGL>
  );
};

export default App;