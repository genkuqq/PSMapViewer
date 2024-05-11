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
import mapjson from "@/public/maps.json";

function MouseHook({ setMousePosition }) {
  const map = useMap();
  useEffect(() => {
    const updateMousePosition = (event) => {
      if (event.type == "mousemove") {
        setMousePosition([
          Math.floor(event.latlng.lng + 1),
          /* fix: 255 Should be absolute Bounds 
            When bigger or smaller maps comes this section should be dynamic
          */
          Math.floor(event.latlng.lat + 255 + 1),
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
        <p>sonuc?</p>
        {mapjson.map((items) => {
          return <div key={items.mapid}>{items.mapname}</div>;
        })}
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
              /* fix: This section kinda buggy should need
               substract bounds from absolute mouse positions*/
              [mousePosition[1] - 256, mousePosition[0]],
              [mousePosition[1] - 255, mousePosition[0] - 1],
            ]}
            /* note: This can be add if you dont want lighter filler color 
            fillColor={"transparent"}*/
            color={"green"}
            fill={true}
            weight={3}
          >
            {/* todo: there is can be option for showing tooltip like on/off */}
            <Tooltip sticky direction="top" offset={[0, -5]}>
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
                /* todo: this section need should be dynamic for the smaller or larger maps */
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
