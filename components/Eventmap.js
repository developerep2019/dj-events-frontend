import Image from 'next/image';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';
import { useEffect, useState } from 'react';

const Eventmap = ({ evt }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [veiwport, setViewport] = useState({
    latitude: 40.712722,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  useEffect(() => {
    Geocode.fromAddress(evt.address).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...veiwport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  if (loading) return false;

  console.log(lat, lng);

  return (
    <ReactMapGL
      {...veiwport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} alt="" />
      </Marker>
    </ReactMapGL>
  );
};

export default Eventmap;
