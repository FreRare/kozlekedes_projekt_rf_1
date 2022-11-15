import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
const position = [46.253, 20.14824];

const Busz = () => {

    const [busesList, setBusesList] = useState([]);
    const [error, setError] = useState('');
    let busList;
    let bus = [];
    if(busesList.length <= 0){
        fetch('/api/bus', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            bus = res.bus;
            console.log("Data got successfully!", bus);
            busList = bus.map((b, index)=>(
                <div className="ticket" key={b.id}>
                    <div>
                        <ul className="ticket-list-1">
                            <li>Járatszám: {b.serviceNumber}</li>
                        </ul>
                        <ul className="ticket-list-2">
                            <li>Honnan: {b.stops[0].name}</li>
                            <li>Hová: {b.stops[b.stops.length-1].name}</li>
                        </ul>
                        {sessionStorage.getItem('loggedin') &&
                            <li><button onClick={() => {
                                ticketPurchase(b.id);
                            }}>Megveszem</button></li>
                        }
                    </div>
                </div>
            ));
            if(!busesList || busesList.length <= 0){
                setBusesList(busList);
            }
        });
    }

    const ticketPurchase = (id)=>{
        console.log('Buying ticket for service: ', id);
        fetch('/api/ticketPurchase', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({jaratID: id})
        }).then(res=>{
            if(res.status === 200){
                setError('Sikeres jegyvásárlás!++');
                alert('Sikeres jegyvásárlás!++');
            }else{
                res.json().then(res=>setError(res.error));
            }
        })
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
    );
}

export default Busz;