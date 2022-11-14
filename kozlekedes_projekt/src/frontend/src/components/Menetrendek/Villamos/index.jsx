import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';
import React, {useEffect, useState} from "react";
const position = [46.253, 20.14824];

const Villamos = () => {

    const [tramsList, setTramsList] = useState([]);
    let tramList;
    let trams = [];
    useEffect(()=>{
        fetch('/villamos', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            trams = res.trams;
            console.log("Data got successfully!", trams);
            tramList = trams.map((b, index)=>(
                <div className="ticket" key={b.id}>
                    <div>
                        <ul className="ticket-list-1">
                            <li>Járatszám: {b.serviceNumber}</li>
                        </ul>
                        <ul className="ticket-list-2">
                            <li>Honnan: {b.stops[0].name}</li>
                            <li>Hová: {b.stops[b.stops.length-1].name}</li>
                        </ul>
                        <ul>
                            <
                        </ul>
                    </div>
                </div>
            ));
            if(!tramsList || tramsList.length <= 0){
                setTramsList(tramList);
            }
        });
    });

    return(
        <div className="container">
            <div className="header">
                <h1>Villamos menetrendek</h1>
            </div>
            <div className="wrapper">
                <div className="menetrendek">
                    {tramsList}
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
        </div>
    );
}

export default Villamos;