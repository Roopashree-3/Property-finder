import Head from 'next/head';
import properties from '../../data/properties';

export async function getServerSideProps({ params }) {
  const prop = properties.find((p) => p.id === params.id) || null;
  if (!prop) return { notFound: true };
  return { props: { prop } };
}

export default function PropertyPage({ prop }) {
  return (
    <>
      <Head>
        <title>{prop.title} — Property Finder</title>
        <meta name="description" content={`${prop.desc} | ₹${prop.price}/night`} />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={`${prop.title} — ₹${prop.price}/night`} />
        <meta property="og:description" content={prop.desc} />
        <meta property="og:image" content={prop.photo} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://your-domain.com/property/${prop.id}`} />
      </Head>

      <div style={{ maxWidth: 900, margin: '24px auto', padding: 20 }}>
        <h1>{prop.title}</h1>
        <img
          src={prop.photo}
          style={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
        <p style={{ fontSize: 18, marginTop: 12 }}>
          ₹{prop.price} / night — {prop.type}
        </p>
        <p>{prop.desc}</p>
        <p style={{ color: '#555' }}>{prop.location}</p>
        <p>⭐ {prop.rating} rating</p>
      </div>
    </>
  );
}
