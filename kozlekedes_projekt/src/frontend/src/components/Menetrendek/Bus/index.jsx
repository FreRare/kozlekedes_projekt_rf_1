import React, {useEffect} from 'react';
import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';

const Bus = () => {
    const position = [46.253, 20.14824];
    let buses = [];
    useEffect(()=>{
        fetch('/bus', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            console.log(res);
            buses = res;
        });
    });

    const busesList = [];
    for(let b of buses) {
        busesList.push((<div className="ticket" key={b.id}>
            <div>
                <ul className="ticket-list-1">
                    <li>Megálló: </li>
                </ul>
                <ul className="ticket-list-2">
                    <li>Honnan: {b.stops[0].name}</li>
                    <li>Hová: {b.stops[b.stops.length-1].name}</li>
                </ul>
            </div>
        </div>))

    }

    return(
        <>
        <div className="header">
            <h1>Busz menetrendek</h1>
        </div>
        <div className="wrapper">
            <div className="menetrendek">
                {busesList}
            </div>
            
            <div className="map-wrap">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
       Pusztulat mennyiségben fogunk még ezzel szenvedni <br /> 
      </Popup>
    </Marker>
  </MapContainer>
            </div>
        </div>
        </>
    )
}

export default Bus;