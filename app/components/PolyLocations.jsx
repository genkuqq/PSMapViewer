import { Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function getAreaCenter(positions) {
  let minX = positions[0][0];
  let minY = positions[0][1];
  let maxX = positions[0][0];
  let maxY = positions[0][1];

  for (let i = 1; i < positions.length; i++) {
    const [x, y] = positions[i];
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return [centerX, centerY];
}

export default function PolyLocations({ mapdata, selectedMap }) {
  return (
    <>
      {mapdata[selectedMap].locations.map((location, index) => {
        const modifiedPositions = location.positions.map(([x, y]) => [
          y - 255,
          x - 1,
        ]);
        return (
          <Polyline
            key={index}
            positions={modifiedPositions}
            fillOpacity={0.35}
            opacity={0}
            fillColor={location.color}
            fill={true}
            interactive={false}
          >
            <Tooltip
              position={getAreaCenter(modifiedPositions)}
              permanent
              opacity={1}
              direction="top"
              interactive={false}
            >
              {location.name}
            </Tooltip>
          </Polyline>
        );
      })}
    </>
  );
}
