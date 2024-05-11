import { LayersControl, ImageOverlay } from "react-leaflet";
import { latLngBounds } from "leaflet";
import "../globals.css";
import "leaflet/dist/leaflet.css";
export default function MapLayerControl({ mapdata, selectedMap }) {
  return (
    <LayersControl>
      <LayersControl.BaseLayer name="Base" checked>
        <ImageOverlay
          className="mapImage"
          url={mapdata[selectedMap].basepath}
          /* todo: this section need should be dynamic for the smaller or larger maps */
          bounds={latLngBounds([0, 0], [-255, 255])}
          opacity={1}
        />
      </LayersControl.BaseLayer>
      {mapdata[selectedMap].areapath ? (
        <LayersControl.BaseLayer name="Area">
          <ImageOverlay
            className="mapImage"
            url={mapdata[selectedMap].areapath}
            /* todo: this section need should be dynamic for the smaller or larger maps */
            bounds={latLngBounds([0, 0], [-255, 255])}
            opacity={1}
          />
        </LayersControl.BaseLayer>
      ) : null}
      {mapdata[selectedMap].cablespath ? (
        <LayersControl.Overlay name="Cables">
          <ImageOverlay
            url={mapdata[selectedMap].cablespath}
            /* todo: this section need should be dynamic for the smaller or larger maps */
            bounds={latLngBounds([0, 0], [-255, 255])}
            opacity={1}
          />
        </LayersControl.Overlay>
      ) : null}
      {mapdata[selectedMap].powernetpath ? (
        <LayersControl.Overlay name="Powernet">
          <ImageOverlay
            url={mapdata[selectedMap].powernetpath}
            /* todo: this section need should be dynamic for the smaller or larger maps */
            bounds={latLngBounds([0, 0], [-255, 255])}
            opacity={1}
          />
        </LayersControl.Overlay>
      ) : null}
    </LayersControl>
  );
}
