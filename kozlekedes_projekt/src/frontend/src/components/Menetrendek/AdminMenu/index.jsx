import React, {useEffect, useState} from "react";
import './index.scss';

const AdminMenu = () => {


    const [busesList, setBusesList] = useState([]);
    const [tramsList, setTramsList] = useState([]);
    const [trolleysList, setTrolleysList] = useState([]);
    const [error, setError] = useState('');

    if(busesList.length <= 0){
        fetch('/api/bus', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let bus = res.bus;
            console.log("Data got successfully!", bus);
            let busList = bus.map((b, index)=>(
                    <tr key={index}>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Honnan: {b.stops[0].name}</td>
                        <td>Hová: {b.stops[b.stops.length-1].name}</td>
                        <td><form method='POST' action='/api/deleteService'>
                            <input type="hidden" id='id' name='id' value={b.id}/>
                            <input type='submit'>Törlés</input>
                        </form></td>
                    </tr>
            ));
                setBusesList(busList);
        }).catch(e=>{
            console.error(e);
            setBusesList((
                <tr>
                    <td>NO DATA FOUND!</td>
                </tr>
            ));
        });
    }

    if(tramsList.length <= 0){
        fetch('/api/tram', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let trams = res.trams;
            console.log("Data got successfully!", trams);
            let tramList = trams.map((b, index)=>(
                    <tr key={index}>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Honnan: {b.stops[0].name}</td>
                        <td>Hová: {b.stops[b.stops.length-1].name}</td>
                        <td><form method='POST' action='/api/deleteService'>
                            <input type="hidden" id='id' name='id' value={b.id}/>
                            <input type='submit'>Törlés</input>
                        </form></td>
                    </tr>
            ));
                setTramsList(tramList);

        }).catch(e=>{
            console.error(e);
            setTramsList((
            <tr>
                <td>NO DATA FOUND!</td>
            </tr>
            ));
        });
    }

    if(trolleysList.length <= 0){
        fetch('/api/trolley', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let trolley = res.trolley;
            console.log("Data got successfully!", trolley);
            let trolleyList = trolley.map((b, index)=>(
                    <tr key={index}>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Honnan: {b.stops[0].name}</td>
                        <td>Hová: {b.stops[b.stops.length-1].name}</td>
                        <td><form method='POST' action='/api/deleteService'>
                            <input type="hidden" id='id' name='id' value={b.id}/>
                            <input type='submit'>Törlés</input>
                        </form></td>
                    </tr>
            ));
                setTrolleysList(trolleyList);
        }).catch(e=>{
            console.error(e);
            setTrolleysList((
            <tr>
                <td>NO DATA FOUND!</td>
            </tr>
            ));
        });
    }

    return(
        <>
        <h1>Admin menu</h1>
        <div className="admin_container">
            <div className="route-list">
            <h3>Járatok kilistázása</h3>
            <h5>BUSZ menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                        <tbody>
            {busesList}
                        </tbody>
                    </table>
                    <button >Törlés</button>
                </div>
            <h5>TROLI menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                    <tbody>
            {trolleysList}
                    </tbody>
                    </table>
                    <button >Törlés</button>
                </div>
            <h5>VILLAMOS menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                    <tbody>
            {tramsList}
                    </tbody>
            </table>
        </div>
            </div>
            <div className="route-add-to-list">
            <h3>Járatok bevitele</h3>
                {error}
                <form>
                <p>id:JARAT.ID | name:MEGALLO.nev | when:mikor</p>
                
                <label className="form__label" htmlFor="id">ID:</label>
                <input className="form__input" type="text" id="id" name="id"  placeholder="pl.: 32" required/>

                <label className="form__label" htmlFor="megallo">MEGALLÓ:</label>
                <input className="form__input" type="text" id="megallo"  name="megallo"  placeholder="pl.: Budapesti Krt" required/>

                <label className="form__label" htmlFor="mikor">MIKOR:</label>
                <input className="form__input" type="text" id="mikor"  name="mikor"  placeholder="pl.: 13:32" required/>
                <button >Adatot feltölt</button>
                </form>
            </div>
        </div>
        </>
)}

export default AdminMenu;