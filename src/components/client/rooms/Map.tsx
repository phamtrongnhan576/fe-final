'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { } from 'leaflet';
import { PositionWithSlug } from '@/lib/client/types/types';
import { getCoordinatesByCity } from '@/lib/client/services/apiService';
import useApi from '@/lib/client/services/useAPI';
import Loading from '../common/Loading';
import Error from '../common/Error';
import EmptyState from '../common/EmptyState';



const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export default function Map({ position }: { position: PositionWithSlug }) {
  const { data, error, isLoading } = useApi("/api/map ", () => getCoordinatesByCity(position.tinhThanh));

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  if (!data) return <EmptyState title="Không tìm thấy tọa độ" description="Vui lòng thử lại" />;

  const { latitude, longitude } = data;

  return (
    <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} className='h-[80vh] rounded-2xl'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>
          {position.tinhThanh}, {position.quocGia}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
