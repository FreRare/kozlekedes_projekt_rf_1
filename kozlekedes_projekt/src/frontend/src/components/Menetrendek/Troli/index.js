import './index.scss';
import { MapContainer, TileLayer, Popup, Marker  } from 'react-leaflet';
const position = [46.253, 20.14824];

const Troli = () => {
    return(
        <div className="container">
        <div className="header">
            <h1>Troli menetrendek</h1>
        </div>
        <div className="wrapper">
            <div className="menetrendek">
                <div className="ticket">
                    <div>
                        <ul className="ticket-list-1">
                            <li>Indulás: </li>
                            <li>Érkezés: </li>
                        </ul>
                        <ul className="ticket-list-2">
                            <li>Honnan: </li>
                            <li>hová: </li>
                        </ul>
                    </div>
                </div>
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