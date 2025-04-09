import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";

// Default icon workaround for Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;

// Routing Control component
const RoutingControl = ({ userLocation, storeLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !storeLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(storeLocation.lat, storeLocation.lng),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "#0455cf", weight: 6 }], // Customize the color of the route
      },
      createMarker: () => null,
      show: false, // To prevent default markers
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userLocation, storeLocation]);

  return null;
};

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
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const R = 6371; // Earth's radius in km

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);

  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in km
  return distance;
};

const MyMap = ({ setDestinationInfo }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [distanceToStore, setDistanceToStore] = useState(null);
  const [timeToStore, setTimeToStore] = useState(null);
  const storeLocation = { lat: 38.077099, lng: 46.291125 }; // Store coordinates
  // const { user } = useContext(UserContext);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const userCoords = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         setUserLocation(userCoords);

  //         // Calculate the distance to the store
  //         const distance = haversineDistance(userCoords, storeLocation);
  //         setDistanceToStore(distance);

  //         // Calculate time to reach the store (distance / speed)
  //         const walkingSpeedKmH = 5; // Speed in km/h
  //         const timeInHours = distance / walkingSpeedKmH;
  //         setTimeToStore(timeInHours);
  //         setDestinationInfo({
  //           distance: distanceToStore.toFixed(2),
  //           time: (timeToStore * 60).toFixed(0),
  //         });
  //       },
  //       (error) => {
  //         toast.error("Error fetching user's location: ", error.message);
  //       }
  //     );
  //   }
  // }, []);

  // Create bounds that contain both user and store locations
  const bounds = userLocation
    ? L.latLngBounds([userLocation, storeLocation])
    : null;

  return (
    <>
      {/* {distanceToStore && (
        <div className="info-box lg:hidden z-50 absolute bg-white w-1/4 text-xs leading-relaxed bottom-0 font-EstedadMedium text-center rounded-t-xl">
          <p className="text-CarbonicBlue-500">
            فاصله تا فروشگاه {distanceToStore.toFixed(2)} کیلومتر
          </p>
          <p className="text-Amber-500">
            زمان تقریبی پیاده‌روی {(timeToStore * 60).toFixed(0)} دقیقه
          </p>
        </div>
      )} */}
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
        {/* {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <span className="font-EstedadExtraBold w-full block">
                مکان شما : {user.Name}
              </span>
            </Popup>
          </Marker>
        )} */}
        <Marker position={storeLocation}>
          <Popup>
            <span className="font-EstedadExtraBold w-full block">
              فروشگاه الکتروشاپ
            </span>
          </Popup>
        </Marker>
        {bounds && <FitMapToBounds bounds={bounds} />}
        {/* {userLocation && storeLocation && (
          <RoutingControl 
          className="hidden lg:block"
            // userLocation={userLocation}
            storeLocation={storeLocation}
          />
        )} */}
        {/* Display Distance and Time */}
      </MapContainer>
    </>
  );
};

export default MyMap;
