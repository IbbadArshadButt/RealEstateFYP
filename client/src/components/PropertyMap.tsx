import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  location: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const PropertyMap = ({ location }: PropertyMapProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geocodeLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using Nominatim Geocoding API (OpenStreetMap)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );

        if (!response.ok) {
          throw new Error('Failed to geocode location');
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          });
        } else {
          setError('Location not found');
        }
      } catch (err) {
        console.error('Geocoding error:', err);
        setError('Failed to load map location');
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      geocodeLocation();
    }
  }, [location]);

  if (loading) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !coordinates) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
        {error || 'Unable to load map'}
      </div>
    );
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>
          {location}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap; 