import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import './App.css';
// import geojson from './us-states';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN2aWF1IiwiYSI6ImFERnVTeXcifQ.Eun4jtPE8upbuP2uKawtFw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-96);
  const [lat, setLat] = useState(37);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      map.current.addSource('us', {
          type: 'geojson',
          data: 'https://cdn.jsdelivr.net/gh/ericjames/us-states-geojson/all-states/NY.geo.json'
      });

      map.current.addLayer({
          'id': 'us-layer',
          'type': 'fill',
          'source': 'us',
          'paint': {
            'fill-color': 'red',
            'fill-opacity': 0.2
          }
      });
    });

  });

  return (
    <div className='App'>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
}

export default App;
