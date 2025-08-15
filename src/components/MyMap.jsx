import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";


// Default icon workaround for Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;


const FitMapToBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [120, 100] }); // Adjust padding as needed
    }
  }, [map, bounds]);
  return null;
};

// Helper function to calculate distance between two lat/lng points

const MyMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distanceToStore, setDistanceToStore] = useState(null);
  const [timeToStore, setTimeToStore] = useState(null);
  const storeLocation = { lat: 38.077099, lng: 46.291125 }; // Store coordinates

  // Create bounds that contain both user and store locations
  const bounds = userLocation
    ? L.latLngBounds([userLocation, storeLocation])
    : null;

  return (
    <>
      <MapContainer
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        center={userLocation || storeLocation}
        zoom={13} // Initial zoom level, it will adjust with fitBounds
        style={{ height: "100vh", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={storeLocation}>
          <Popup>
            <span className="font-EstedadExtraBold w-full block">
              فروشگاه الکتروشاپ
            </span>
          </Popup>
        </Marker>
        {bounds && <FitMapToBounds bounds={bounds} />}
      </MapContainer>
    </>
  );
};

export default MyMap;
