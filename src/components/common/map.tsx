import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
}

export default function Map({ x, y, className, ...props }: MapProps) {
  return (
    <div className={cn("h-full w-full", className)} {...props} id="startMap">
      <MapContainer
        center={[x, y]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          id="tilelayer"
        />
        <Marker position={[x, y]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
