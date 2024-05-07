"use client";
import {
  MapContainer,
  LayersControl,
  ImageOverlay,
  Rectangle,
  useMap,
} from "react-leaflet";
import { CRS, latLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

/* Working correctly */
function MouseHook({ setMousePosition }) {
  const map = useMap();
  useEffect(() => {
    const updateMousePosition = (event) => {
      if (event.type == "mousemove") {
        setMousePosition([event.latlng.lat, event.latlng.lng]);
      }
    };
    map.on("mousemove", updateMousePosition);
    return () => {
      map.off("mousemove", updateMousePosition);
    };
  }, [map, setMousePosition]);
  return null;
}

function Map(prop) {
  const [mousePosition, setMousePosition] = useState([0, 0]);
  return (
    <main>
      <div>
        <MapContainer
          center={[-128, 128]}
          zoom={5}
          crs={CRS.Simple}
          scrollWheelZoom={true}
          zoomAnimation={false}
          maxBounds={latLngBounds([0, 0], [-300, 300])}
        >
          {/* HOOKS */}
          <MouseHook setMousePosition={setMousePosition} />
          <Rectangle
            bounds={[
              [Math.floor(mousePosition[0]), Math.floor(mousePosition[1])],
              [
                Math.floor(mousePosition[0]) + 1,
                Math.floor(mousePosition[1]) + 1,
              ],
            ]}
            color={"green"}
            fill={false}
            weight={3}
          />

          <LayersControl>
            <LayersControl.BaseLayer name="Base" checked>
              <ImageOverlay
                url={
                  "/mapimages/" +
                  prop.name +
                  "/" +
                  prop.name +
                  "StationBase.png"
                }
                bounds={latLngBounds([0, 0], [-255, 255])}
                opacity={1}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
