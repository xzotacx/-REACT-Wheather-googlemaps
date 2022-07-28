import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "../../credentials";

function GoogleMapBackground() {
  const [center, setCenter] = useState({ lat: 12, lng: 12 });
  const [marker, setMarker] = useState({ lat: 12, lng: 12 });
  return (
    <GoogleMap defaultCenter={center} defaultZoom={10}>
      <Marker position={marker} key={GOOGLE_MAPS_API_KEY} onClick={() => {}} />
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(GoogleMapBackground));

export default () => {
  return (
    <div className="map-container">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div>Loading</div>}
        containerElement={<div>Loading</div>}
        mapElement={<div>Loading</div>}
      />
    </div>
  );
};