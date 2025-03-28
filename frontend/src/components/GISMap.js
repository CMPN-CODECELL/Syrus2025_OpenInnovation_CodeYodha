import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import gisHelpers from '../utils/gishelpers';

const GISMap = ({ farmData }) => {
    const [map, setMap] = useState(null);
    const [farmBoundaries, setFarmBoundaries] = useState([]);

    useEffect(() => {
        // Fetch farm boundaries and geospatial data
        const fetchFarmData = async () => {
            const boundaries = await gisHelpers.getFarmBoundaries();
            setFarmBoundaries(boundaries);
        };
        fetchFarmData();
    }, []);

    const mapOptions = {
        center: { lat: 20.5937, lng: 78.9629 }, // India's center
        zoom: 5
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ height: '600px', width: '100%' }}
                options={mapOptions}
                onLoad={setMap}
            >
                {farmBoundaries.map(farm => (
                    <Polygon
                        paths={farm.coordinates}
                        options={{
                            fillColor: gisHelpers.getSuitabilityColor(farm.suitabilityScore),
                            strokeColor: '#000',
                            fillOpacity: 0.35
                        }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default GISMap;