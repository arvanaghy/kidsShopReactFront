import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Map = () => {
    const mapOptions = {
        center: [38.077099, 46.291125], 
        zoom: 13,
    };
    return (
        <MapContainer center={mapOptions.center} zoom={mapOptions.zoom} style={{ height: '12rem', borderRadius: '1rem' , zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={mapOptions.center} />
        </MapContainer>
    );
};

export default Map;