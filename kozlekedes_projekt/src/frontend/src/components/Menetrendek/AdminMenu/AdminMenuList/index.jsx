import React, {useEffect, useState} from "react";
import './index.scss';

const AdminMenuList = () =>{

    //Stops list
    const [stopList, setStopList] = useState([]);
    const [CurrentStopsList, setCurrentStopsList] = useState({
        name: "",
        arrivalTime: "" 
    });

    const [CurrentStops, setCurrentStops] = useState([]);
    let [valtozoamibenbenneleszezalistaXD, setvaltozoamibenbenneleszezalistaXD] = useState("");
    useEffect(() => {
        
    }, [CurrentStops])
    

    
    const handleChange = (event) => {
        setCurrentStopsList({...CurrentStopsList, [event.target.name]: event.target.value});
    };

    function addStopToCurrentstops(){
        const egymasikvaltozoamibenletarolomacurrentstopsot = CurrentStops;
        egymasikvaltozoamibenletarolomacurrentstopsot.push(CurrentStopsList);
        setCurrentStops(egymasikvaltozoamibenletarolomacurrentstopsot);
        setvaltozoamibenbenneleszezalistaXD(CurrentStops.map((e, index )=> (
            <div key={index}>
            <p>{e.name} </p>
            <p>{e.arrivalTime}</p>
            </div>
        )))
        console.log(CurrentStops);
    }

    
    
    if(stopList.length <= 0){
        fetch('/api/getStops', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let stops = res.stops;
            //console.log("Stops Data got successfully!", stops);
            let stopList = stops.map((b, index)=>(
                
                <option key={index}>{b.name}</option>
                
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


    return(
    <>
    <h1>Adatok</h1>
    <div className="data_container">
        
        <div className="input_container_to_db">
        <h2>Megálló adatok</h2>
            <div className="input_container_1">
                <select name="name" onChange={e => handleChange(e)} >
                    {stopList}
                </select>
            </div>
                <div className="input_container_2">
                <input type="time" id="time" name="arrivalTime"  onChange={e => handleChange(e)} required></input>
                
            </div>
            <div className="input_container_3">
            <button onClick={addStopToCurrentstops}>Megálló hozzáadása</button>
            <p>Járatszám : {JSON.parse(sessionStorage.getItem('serviceNumber'))}</p>
            <p>Típus : {JSON.parse(sessionStorage.getItem('serviceType'))}</p>
            <button>Járat hozzáadása</button>
            </div>
            
        </div>
        
       
        <div className="admin_stops_list">
            <h2>Itt egy lista lesz</h2>
            {valtozoamibenbenneleszezalistaXD}

            

        </div>
        
    </div>
    </>
    )
}

export default AdminMenuList;