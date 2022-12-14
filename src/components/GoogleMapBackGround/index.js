import React from "react";
import "./styles.css";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  OverlayView,
} from "react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "../../credentials";
import WeatherTile from "../WeaterTile";
import useGoogleMapsBackground from "./hooks/useGoogleMapsBackground";

function GoogleMapBackground({}) {
  const { addNewMarker, weathers, markers, center } = useGoogleMapsBackground();
  return process.env.NODE_ENV === "development" ? (
    <></>
  ) : (
    <GoogleMap
      center={center}
      defaultZoom={10}
      styles={{
        width: "100%",
        height: "100%",
      }}
      onClick={(e) => {
        console.log(e);
        addNewMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
    >
      {/* {markers.map((marker, i) => (
        <Marker
          key={i}
          position={marker}
          onClick={(e) => {
            console.log(e);
          }}
        ></Marker>
      ))} */}

      {weathers.map((weather) => (
        <React.Fragment key={weather.id}>
          <OverlayView
            onClick={(e) => {}}
            position={{ lat: weather.coord.lat, lng: weather.coord.lon }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            {
              <div className="google-map-marker">
                <WeatherTile weather={weather} />
              </div>
            }
          </OverlayView>
        </React.Fragment>
      ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(GoogleMapBackground));

export default () => {
  return process.env.NODE_ENV === "development" ? (
    <GoogleMapBackground />
  ) : (
    <div className="map-container map-container--fix">
      <WrappedMap
        onClick={(e) => {
          console.log("Wrapper");
          console.log(e);
        }}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div>Loading</div>}
        containerElement={<div>Loading</div>}
        mapElement={<div>Loading</div>}
        styles={{
          width: "100%",
          height: "100%",
          GoogleMapBackground: "black",
        }}
      />
    </div>
  );
};
