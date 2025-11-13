import 'leaflet/dist/leaflet.css';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
return (
<>
<Head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Property Finder</title>
</Head>
<Component {...pageProps} />
</>
);
}