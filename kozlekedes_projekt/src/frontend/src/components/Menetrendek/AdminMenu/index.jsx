import React, {useEffect, useState} from "react";
import './index.scss';
import {useNavigate} from "react-router-dom";

const AdminMenu = () => {
    //Stops list
    const [stopList, setStopList] = useState([]);
    
    if(stopList.length <= 0){
        fetch('/api/getStops', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let stops = res.stops;
            console.log("Stops Data got successfully!", stops);
            let stopList = stops.map((b, index)=>(
                <select key={index}>
                <option>b.name</option>
                </select>
            ));
            setStopList(stopList);

        }).catch(e=>{
            console.log("Szar a valami ez van",e);
            setStopList((
           <select>
            <option>NO DATA FOUND</option>
           </select>
            ));
        });
    }

    //Lists
    const [busesList, setBusesList] = useState([]);
    const [tramsList, setTramsList] = useState([]);
    const [trolleysList, setTrolleysList] = useState([]);
    const [error, setError] = useState('');
    const nav = useNavigate();

    if(busesList.length <= 0){
        fetch('/api/bus', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let bus = res.bus;
            //console.log("Bus Data got successfully!", bus);
            let busList = bus.map((b, index)=>(
                    <tr key={index}>
                        <td>{b.serviceNumber}</td>
                        <td>{b.stops[0].name}</td>
                        <td>{b.stops[b.stops.length-1].name}</td>
                        <td>
                            <button onClick={()=>{deleteService(b.id)}}>Törlés</button>
                        </td>
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
            //console.log("Tram Data got successfully!", trams);
            let tramList = trams.map((b, index)=>(
                    <tr key={index}>
                        <td>{b.serviceNumber}</td>
                        <td>{b.stops[0].name}</td>
                        <td>{b.stops[b.stops.length-1].name}</td>
                        <td>
                            <button onClick={()=>{deleteService(b.id)}}>Törlés</button>
                        </td>
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
            //console.log("Trolley Data got successfully!", trolley);
            let trolleyList = trolley.map((b, index)=>(
                    <tr key={index}>
                        <td>{b.serviceNumber}</td>
                        <td>{b.stops[0].name}</td>
                        <td>{b.stops[b.stops.length-1].name}</td>
                        <td>
                            <button onClick={()=>{deleteService(b.id)}}>Törlés</button>
                        </td>
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

    const deleteService = (id)=>{
        fetch('api/deleteService', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(res=>{
            if(res.success){
                console.log("Service successfully deleted!");
                nav('/Menetrendek/AdminMenu');
            }else{
                setError(res.error);
            }
        }).catch(e=>console.error(e));
    }

    const [number, setNumber] = useState('');
    const [type, setType] = useState('');

    const redirectToCreateService = ()=>{
        sessionStorage.setItem('serviceNumber', JSON.stringify(number));
        sessionStorage.setItem('serviceType', JSON.stringify(type));
        nav('/menetrendek/adminMenu/adminMenuList');
        nav(0);
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
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                        <tbody>
            {busesList}
                        </tbody>
                    </table>
                </div>
            <h5>TROLI menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
                            <th>JÁRATSZÁM</th>
                            <th>HONNAN</th>
                            <th>HOVÁ</th>
                        </tr>
                        </thead>
                    <tbody>
            {trolleysList}
                    </tbody>
                    </table>
                </div>
            <h5>VILLAMOS menetrendek listázása:</h5>
                <div className="route-list-wrapper">
                    <table className="route-list-table">
                        <thead>
                        <tr>
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
                <label className="form__label" htmlFor="id">Járatszám:</label>
                <input className="form__input" type="text" id="id" name="id"  placeholder="pl.: 32" onChange={e=>setNumber(e.target.value)}/>
                    <label htmlFor='type' className='form__label'>
                        Service type:
                        <select name="type" id='type' onChange={e=>setType(e.target.value)}>
                            <option>Busz</option>
                            <option>Villamos</option>
                            <option>Trolibusz</option>
                        </select>
                    </label>

                <br></br>
                <div className="labello">
                <label className="form__label" htmlFor="megallo">Megálló:</label>
                </div>

<div className="input_container_to_db">
    <div className="input_container_1">
                {stopList}
    </div>
                <div className="input_container_2">
                <input type="time" id="time" name="time" required></input>
    </div>
</div>
                
                <button onClick={redirectToCreateService} >Adatot feltölt</button>
                </form>
            </div>
        </div>
        </>
)}

export default AdminMenu;