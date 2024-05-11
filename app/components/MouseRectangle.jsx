import { Rectangle, Tooltip } from "react-leaflet";
export default function MouseRectangle({ mousePosition }) {
  return (
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
        X: {Math.floor(mousePosition[0])} Y: {Math.floor(mousePosition[1])}
      </Tooltip>
    </Rectangle>
  );
}
