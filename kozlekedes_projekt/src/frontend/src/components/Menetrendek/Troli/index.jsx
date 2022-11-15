import React, {useState} from 'react';
import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';
const position = [46.253, 20.14824];

const Troli = () => {

    const [trolleysList, setTrolleysList] = useState([]);
    const [error, setError] = useState('');
    let trolleyList;
    let trolley = [];
    if(trolleysList.length <= 0){
        fetch('/api/trolley', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            trolley = res.trolley;
            console.log("Data got successfully!", trolley);
            trolleyList = trolley.map((b, index)=>(
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
                            <button onClick={() => {
                                ticketPurchase(b.id);
                            }}>Megveszem</button>
                        }
                    </div>
                </div>
            ));
            if(!trolleysList || trolleysList.length <= 0){
                setTrolleysList(trolleysList);
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
            <h1>Troli menetrendek</h1>
        </div>
        <div className="wrapper">
            <div className="menetrendek">
                {trolleyList}
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

export default Troli;