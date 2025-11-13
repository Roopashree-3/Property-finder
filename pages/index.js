import Head from 'next/head';
import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import properties from '../data/properties';

// dynamically import leaflet map to avoid SSR issues
const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function HomePage() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [propertyType, setPropertyType] = useState('All');
  const [visibleProperties, setVisibleProperties] = useState([]);

  // Filter properties based on selected price range and type
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const priceOk = p.price >= minPrice && p.price <= maxPrice;
      const typeOk = propertyType === 'All' || p.type === propertyType;
      return priceOk && typeOk;
    });
  }, [minPrice, maxPrice, propertyType]);

  // handle map visible changes
  const handleVisibleChange = (visibleIds) => {
    const list = filteredProperties.filter((p) => visibleIds.includes(p.id));
    setVisibleProperties(list);
  };

  // save visible properties
  useEffect(() => {
    if (visibleProperties.length > 0) {
      sessionStorage.setItem('lastViewed', JSON.stringify(visibleProperties));
    }
  }, [visibleProperties]);

  return (
    <>
      <Head>
        <title>Property Finder — Karnataka</title>
        <meta
          name="description"
          content="Find properties in Karnataka with live filters and map view."
        />
      </Head>

      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '320px',
            overflowY: 'auto',
            padding: '1rem',
            background: '#f9f9f9',
            borderRight: '1px solid #ddd',
          }}
        >
          <h2>Filters</h2>

          {/* Price Range Sliders */}
          <label style={{ fontWeight: 'bold' }}>Min Price: ₹{minPrice}</label>
          <input
            type="range"
            min="0"
            max="15000"
            step="500"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
            style={{ width: '100%', marginBottom: '8px' }}
          />

          <label style={{ fontWeight: 'bold' }}>Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="0"
            max="15000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            style={{ width: '100%', marginBottom: '10px' }}
          />

          {/* Property Type */}
          <label style={{ fontWeight: 'bold' }}>Property Type:</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <option value="All">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Room">Room</option>
            <option value="Penthouse">Penthouse</option>
          </select>

          <h3>Matching Properties</h3>
          {filteredProperties.length === 0 && <p>No properties match your filter.</p>}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredProperties.map((p) => (
              <li
                key={p.id}
                style={{
                  marginBottom: '1rem',
                  background: '#fff',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                }}
              >
                <a href={`/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={p.photo}
                    alt={p.title}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <h4>{p.title}</h4>
                    <p>₹{p.price} / night</p>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>{p.location}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Map */}
        <main style={{ flexGrow: 1 }}>
          <Map properties={filteredProperties} onVisibleChange={handleVisibleChange} />
        </main>
      </div>
    </>
  );
}
