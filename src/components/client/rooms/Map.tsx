import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { PositionWithSlug } from '@/lib/client/types/types';

const filterPosition = (id: number): LatLngExpression => {
  switch (id) {
    case 1:
      return [10.0452, 105.7469];
    case 3:
      return [12.2388, 109.1967];
    case 4:
      return [21.0285, 105.8048];
    case 5:
      return [10.2249, 103.9572];
    case 6:
      return [16.0544, 108.2022];
    case 7:
      return [11.9404, 108.458];
    case 8:
      return [10.9807, 108.2551];
    default:
      return [10.0452, 105.7469];
  }
};

const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/marker-shadow.png',
  shadowSize: [41, 41]
});

export default function Map({ position }: { position: PositionWithSlug }) {
  return (
    <MapContainer center={filterPosition(position.id)} zoom={13} scrollWheelZoom={false} className='h-[80vh] rounded-2xl'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        key={position.id}
        position={filterPosition(position.id)}
        icon={customIcon}
      >
        <Popup>
          {position.tenViTri}
        </Popup>
      </Marker>
    </MapContainer>
  );
} 