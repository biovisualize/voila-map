import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import geojsonFile from './assets/us-states.geojson';
// import geojsonFile from './assets/map_flat.geojson';
// import geojsonFile from './assets/HRVA_Units_land_4326.json';

import './App.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN2aWF1IiwiYSI6ImFERnVTeXcifQ.Eun4jtPE8upbuP2uKawtFw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-96);
  const [lat, setLat] = useState(37);
  const [zoom, setZoom] = useState(4);

  console.log(geojsonFile)

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      map.current.addSource('geo', {
          type: 'geojson',
          data: geojsonFile
      });

      map.current.addLayer({
          'id': 'geo-layer',
          'type': 'fill',
          'source': 'geo',
          'paint': {
            'fill-color': {
              property: 'density',
              stops: [[0, '#fff'], [500, '#e00'], [1200, '#f00']]
            },
            'fill-opacity': 0.8
          },
      });

      // map.current.addLayer({
      //   'id': 'geo-layer',
      //   'type': 'fill',
      //   'source': 'geo',
      //   'paint': {
      //     'fill-color': 'orange',
      //     'fill-opacity': 0.8
      //   },
      // });

      // map.current.addLayer({
      //   'id': 'geo-borders',
      //   'type': 'line',
      //   'source': 'geo',
      //   'layout': {},
      //   'paint': {
      //       'line-color': 'red',
      //       'line-width': 2
      //   }
      // });


    });

  });

  return (
    <div className='App'>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
}

export default App;
