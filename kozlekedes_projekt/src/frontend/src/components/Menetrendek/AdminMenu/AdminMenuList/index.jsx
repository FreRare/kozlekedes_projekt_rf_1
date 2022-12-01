import React, {useEffect, useState} from "react";
import './index.scss';

const AdminMenuList = () =>{

    //Stops list
    const [stopList, setStopList] = useState([]);
    
    if(stopList.length <= 0){
        fetch('/api/getStops', {
            method: 'get'
        }).then(res=>res.json()).then(res=>{
            let stops = res.stops;
            console.log("Stops Data got successfully!", stops);
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
        <div className="labello">
            <label className="form__label" htmlFor="megallo">Megálló:</label>
        </div>
        <div className="input_container_to_db">
            <div className="input_container_1">
                <select>
                    {stopList}
                </select>
            </div>
                <div className="input_container_2">
                <input type="time" id="time" name="time" required></input>
            </div>
        </div>
    </>
    )
}

export default AdminMenuList;