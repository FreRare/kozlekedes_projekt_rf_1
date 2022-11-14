import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
const position = [46.253, 20.14824];

const Villamos = () => {

    const [tramsList, setTramsList] = useState([]);
    const [error, setError] = useState('');
    const nav = useNavigate();
    let tramList;
    let trams = [];
    if(tramsList.length <= 0){
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
                        <button onClick={()=>{
                            ticketPurchase(b.id);
                        }}>Megveszem</button>
                    </div>
                </div>
            ));
            if(!tramsList || tramsList.length <= 0){
                setTramsList(tramList);
            }
        });
    }

    const ticketPurchase = (id)=>{
        fetch('/api/ticketPurchase', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({jaratID: id})
        }).then((res=>res.json())).then(res=>{
            if(res.status === 200){
                setError('Sikeres jegyvásárlás!++');
            }else{
                setError(res.error);
            }
        })
    }

    return(
        <div className="container">
            <div className="header">
                <h1>Villamos menetrendek</h1>
            </div>
            {error}
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