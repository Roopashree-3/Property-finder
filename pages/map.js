import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function MapPage() {
  const [visibleProperties, setVisibleProperties] = useState([]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Side list */}
      <div style={{ width: '25%', overflowY: 'auto', borderRight: '1px solid #ddd', padding: 16 }}>
        <h3>Properties in View</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {visibleProperties.map((p) => (
            <li key={p.id} style={{ marginBottom: 12 }}>
              <strong>{p.title}</strong>
              <div>₹{p.price}/night</div>
              <div>{p.location}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div style={{ width: '75%' }}>
        <Map onViewportChange={setVisibleProperties} />
      </div>
    </div>
  );
}
