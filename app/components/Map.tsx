"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for leaflet default icon missing in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  lat: number;
  lng: number;
  image: string;
}

const Map = ({ properties }: { properties: Property[] }) => {
  return (
    <MapContainer 
      center={[-1.9441, 30.0891]} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
      className="z-10"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {properties.map(property => (
        <Marker 
          key={property.id} 
          position={[property.lat, property.lng]} 
          icon={customIcon}
        >
          <Popup className="property-popup">
            <div className="p-0 overflow-hidden rounded-xl border-none shadow-xl min-w-[200px]">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-24 object-cover" 
              />
              <div className="p-3">
                <p className="text-[13px] font-black text-[#1E3A5F] mb-1">{property.name}</p>
                <div className="flex justify-between items-center">
                   <p className="text-[11px] font-bold text-gray-500">{property.location}</p>
                   <p className="text-[13px] font-black text-gray-900">{property.price}</p>
                </div>
                <button className="w-full mt-3 bg-[#1E3A5F] text-white py-2 rounded-lg text-[10px] font-black hover:shadow-lg transition-all uppercase tracking-wider">
                  View Shares
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.2) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 240px !important;
        }
        .leaflet-container {
          font-family: var(--font-jost), sans-serif !important;
        }
      `}</style>
    </MapContainer>
  );
};

export default Map;
