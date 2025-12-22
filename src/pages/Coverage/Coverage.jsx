import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.8103, 90.4125]
    const service = useLoaderData();
    console.log(service)
    return (
        <div className="w-full  bg-[#FBF9D1] flex flex-col items-center py-10">
            <h2 className="text-5xl font-bold mb-4">Our Delivery Area</h2>

            <p className="text-gray-600 mb-8 text-center max-w-xl">
                We currently provide fast & secure delivery across these service locations.
            </p>
        

            <div className="w-full max-w-5xl h-[500px] shadow-xl rounded-xl overflow-hidden">
                <MapContainer
                    className='h-[800px]'
                    center={position} zoom={7} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        service?.map((center, index) => <Marker  key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                               <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(',' )}.
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
