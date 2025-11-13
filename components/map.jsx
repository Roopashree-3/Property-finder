'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom map event handler to track visible bounds
function MapEventHandler({ onVisibleChange }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const visibleIds = [];
      map.eachLayer((layer) => {
        if (layer.options?.id && layer.getLatLng && bounds.contains(layer.getLatLng())) {
          visibleIds.push(layer.options.id);
        }
      });
      onVisibleChange(visibleIds);
    },
  });
  return null;
}

export default function Map({ properties, onVisibleChange }) {
  const [center, setCenter] = useState([12.9716, 77.5946]); // Default Bengaluru

  useEffect(() => {
    if (properties.length > 0) {
      setCenter([properties[0].lat, properties[0].lng]);
    }
  }, [properties]);

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
      />

      <MapEventHandler onVisibleChange={onVisibleChange} />

      {properties.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} id={p.id}>
          <Popup>
            <div
              style={{
                width: '200px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 6px rgba(0,0,0,0.2)',
              }}
            >
              <img
                src={p.photo}
                alt={p.title}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderBottom: '1px solid #ddd',
                }}
              />
              <div style={{ padding: '6px 10px' }}>
                <h4 style={{ margin: '4px 0', fontSize: '15px' }}>{p.title}</h4>
                <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>
                  {p.location}
                </p>
                <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#333' }}>
                  ₹{p.price} / night
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
