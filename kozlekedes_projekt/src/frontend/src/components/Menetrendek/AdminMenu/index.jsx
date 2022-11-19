import React, {useEffect, useState} from "react";
import './index.scss';

const AdminMenu = () => {


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
            busList = bus.map((b)=>(
            <div className="route-list-wrapper" key={b.id }>
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
                    <tr>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Honnan: {b.stops[0].name}</td>
                        <td>Hová: {b.stops[b.stops.length-1].name}</td>
                    </tr>
                </tbody>
            </table>
            <button >Törlés</button>
            </div>
            ));
            if(!busesList || busesList.length <= 0){
                setBusesList(busList);
            }
        }).catch(e=>{
            console.error(e);
            setError(e);
        });
    }

    const [tramsList, setTramsList] = useState([]);
    
    let tramList;
    let trams = [];
    if(tramsList.length <= 0){
        fetch('/api/tram', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            trams = res.trams;
            console.log("Data got successfully!", trams);
            tramList = trams.map((b, index)=>(
                <div className="route-list-wrapper"key={b.id }>
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
                    <tr>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Honnan: {b.stops[0].name}</td>
                        <td>Hová: {b.stops[b.stops.length-1].name}</td>
                    </tr>
                </tbody>
            </table>
            <button >Törlés</button>
            </div>
            ));
            if(!tramsList || tramsList.length <= 0){
                setTramsList(tramList);
            }
        });
    }

    const [trolleysList, setTrolleysList] = useState([]);
    
    let trolleyList;
    let trolley = [];
    if(trolleysList.length <= 0){
        fetch('/api/trolley', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            trolley = res.trolley;
            console.log("Data got successfully!", trolley);
            trolleyList = trolley.map((b, index)=>(
                <div className="route-list-wrapper"key={b.id }>
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
                    <tr>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Járatszám: {b.serviceNumber}</td>
                        <td>Honnan: {b.stops[0].name}</td>
                        <td>Hová: {b.stops[b.stops.length-1].name}</td>
                    </tr>
                </tbody>
            </table>
            <button >Törlés</button>
            </div>
            ));
            if(!trolleysList || trolleysList.length <= 0){
                setTrolleysList(trolleyList);
            }
        });
    }
    return(
        <>
        <h1>Admin menu</h1>
        <div className="admin_container">
            <div className="route-list">
            <h3>Járatok kilistázása</h3>
            <h5>BUSZ menetrendek listázása:</h5>
            {busesList}
            <h5>TROLI menetrendek listázása:</h5>
            {trolleysList}
            <h5>VILLAMOS menetrendek listázása:</h5>
            {tramsList}
            
            </div>
            <div className="route-add-to-list">
            <h3>Járatok bevitele</h3>
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