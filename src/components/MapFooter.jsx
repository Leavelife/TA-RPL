"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Konfigurasi ikon default Leaflet agar marker muncul di Next.js
L.Icon.Default.mergeOptions({
    iconRetinaUrl: (markerIcon2x && markerIcon2x.src) ? markerIcon2x.src : markerIcon2x,
    iconUrl: (markerIcon && markerIcon.src) ? markerIcon.src : markerIcon,
    shadowUrl: (markerShadow && markerShadow.src) ? markerShadow.src : markerShadow,
});

const MapFooter = () => {
    const lat = Number(process.env.NEXT_PUBLIC_Y_COOR);
    const lng = Number(process.env.NEXT_PUBLIC_X_COOR);
    const position = [lat, lng];

    return (
        <div className="w-full h-48">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-lg shadow-md">
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                Location Company
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    );
};

export default MapFooter;
