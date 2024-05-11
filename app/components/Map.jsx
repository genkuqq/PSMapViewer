"use client";
import {
  MapContainer,
  LayersControl,
  ImageOverlay,
  useMap,
  Tooltip,
  Rectangle,
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
        setMousePosition([
          Math.floor(event.latlng.lng + 1),
          Math.floor(event.latlng.lat + Math.abs(-255) + 1),
        ]);
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
        <p>
          {mousePosition[0]} | {mousePosition[1]}
        </p>
      </div>
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
              [mousePosition[1] - 256, mousePosition[0]],
              [mousePosition[1] - 255, mousePosition[0] - 1],
            ]}
            color={"green"}
            fill={true}
            weight={3}
          >
            <Tooltip sticky direction="top">
              X: {Math.floor(mousePosition[0])} Y:{" "}
              {Math.floor(mousePosition[1])}
            </Tooltip>
          </Rectangle>

          <LayersControl>
            <LayersControl.BaseLayer name="Base" checked>
              <ImageOverlay
                url={
                  "./mapimages/" +
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
