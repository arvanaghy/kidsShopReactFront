import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import useCompanyInfo from "@hooks/useCompanyInfo";

// Default icon workaround for Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;

// Helper function to calculate distance between two lat/lng points

const MyMap = () => {
  const { companyInfo, loading, error } = useCompanyInfo();
  if (loading) return <>درحال بارگذاری</>;
  if (error) return <>خطا : {error}</>;
  const storeLocation = {
    lat: companyInfo?.latitude,
    lng: companyInfo?.longitude,
  };

  return (
    <MapContainer
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      center={storeLocation}
      zoom={13}
      className="order-1 lg:order-2 p-3 mx-5 w-full h-[50vh] lg:h-screen rounded-2xl shadow-2xl"
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
    </MapContainer>
  );
};

export default MyMap;
