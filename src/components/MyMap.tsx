import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-routing-machine";
import { useCompanyInfo } from "@hooks/useGeneralSetting";
import JumpingDots from "@components/JumpingDots";
import { companyInfoResponse } from "@definitions/CompanyType";
import "leaflet/dist/leaflet.css";

// import L from "leaflet";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

const MyMap = () => {

  // const DefaultIcon = L.icon({
  //   iconUrl: icon,
  //   shadowUrl: iconShadow,
  // });

  // L.Marker.prototype.options.icon = DefaultIcon;

  const { companyInfo, isPending }: companyInfoResponse = useCompanyInfo();
  if (isPending) return <JumpingDots />;

  const lat = Number(companyInfo?.latitude) || import.meta.env.VITE_CONTACT_INFO_LATITUDE;
  const lng = Number(companyInfo?.longitude) || import.meta.env.VITE_CONTACT_INFO_LONGITUDE;

  const storeLocation: [number, number] = [lat, lng];

  return (
    <MapContainer
      zoomControl={false}
      doubleClickZoom={false}
      dragging={false}
      scrollWheelZoom={false}
      center={storeLocation}
      zoom={13}
      className="order-1 lg:order-2 p-3 mx-5 w-full h-[50vh] lg:h-screen rounded-2xl shadow-2xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
