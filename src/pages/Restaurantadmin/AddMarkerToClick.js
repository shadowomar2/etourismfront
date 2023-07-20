import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup ,useMapEvents } from "react-leaflet";
import L from "leaflet";

export default function AddMarkerToClick({ onMarkerAdd }) {
  const [markers, setMarkers] = useState([]);

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setMarkers([newMarker]);
      onMarkerAdd(newMarker);
    },
  });

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
              iconSize: [30, 40],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50],
          })}
        >
        </Marker>
      ))}
    </>
  );
}