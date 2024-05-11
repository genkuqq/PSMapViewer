"use client";
import { MapContainer, useMapEvent, Tooltip, Rectangle } from "react-leaflet";
import { CRS, latLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import mapjson from "@/public/maps.json";
import MapLayerControl from "./LayerControl";
import PolyLocations from "./PolyLocations";
import MouseRectangle from "./MouseRectangle";
import "../globals.css";

function MouseHook({ setMousePosition }) {
  useMapEvent("mousemove", (event) => {
    setMousePosition([
      Math.floor(event.latlng.lng + 1),
      Math.floor(event.latlng.lat + 255 + 1),
    ]);
  });
  return null;
}
function Map() {
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [selectedMap, setSelectedMap] = useState(0);
  return (
    <main>
      <div>
        <p>This section for the buttons | Selected Map: {selectedMap}</p>
        {mapjson.map((items) => {
          return (
            <div key={items.mapid}>
              <button onClick={() => setSelectedMap(items.mapid)}>
                {items.mapname}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <MapContainer
          className="map"
          center={[-128, 128]}
          zoom={5}
          crs={CRS.Simple}
          scrollWheelZoom={true}
          zoomAnimation={false}
          maxBounds={latLngBounds([0, 0], [-300, 300])}
        >
          <MouseHook setMousePosition={setMousePosition} />
          <MouseRectangle mousePosition={mousePosition} />
          <MapLayerControl mapdata={mapjson} selectedMap={selectedMap} />
          {/* note: This section here because its buggy when i try
          put it layercontrols
          Its creating multiple layers */}
          {mapjson[selectedMap].locations && (
            <PolyLocations
              key={selectedMap}
              mapdata={mapjson}
              selectedMap={selectedMap}
            />
          )}
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
