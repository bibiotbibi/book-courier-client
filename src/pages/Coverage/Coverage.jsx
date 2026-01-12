import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

// Fix: Define a custom icon because default icons often break in React builds
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set default icon globally
L.Marker.prototype.options.icon = defaultIcon;

const Coverage = () => {
  // Get data from loader
  const service = useLoaderData();
  
  // Center map roughly on Bangladesh
  const position = [23.8103, 90.4125];

  return (
    <section className="bg-gradient-to-b from-[#FBF9D1] to-[#F5F1C2] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Our Delivery Coverage
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            We currently provide fast and secure book delivery across these
            service locations throughout the country.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#EEE8C9]">
          
          {/* Top Bar */}
          <div className="absolute top-0 left-0 w-full z-[1000] bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#EEE8C9]">
            <div>
              <h3 className="font-semibold text-primary">Live Service Map</h3>
              <p className="text-sm text-gray-500">
                Showing all active BookCourier delivery zones
              </p>
            </div>
            <div className="px-4 py-1 bg-[#F3E9B3] text-sm rounded-full text-[#7A6422]">
              {service?.length || 0} Locations Active
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-[550px] pt-16 z-0">
            <MapContainer
              className="h-full w-full"
              center={position}
              zoom={7}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Render Markers */}
              {service?.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                  icon={defaultIcon} // Ensure the icon is set
                >
                  <Popup>
                    <strong>{center.district}</strong>
                    <br />
                    Covered Area:
                    <br />
                    {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-8 text-gray-500">
          Expanding to new cities every month to serve more authors, publishers,
          and book lovers.
        </p>
      </div>
    </section>
  );
};

export default Coverage;