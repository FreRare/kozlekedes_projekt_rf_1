import React from 'react';
import './index.scss';
import { useState } from "react";
import {useNavigate} from "react-router-dom";


const Register = () => {

    const [registrationInfo, setRegistrationInfo] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        zipcode: "",
        street: "",
        houseNumber: "",
        birthDate: ""
    });
    const [error, setError] = useState('');
    const nav = useNavigate();

    const handleChange = (event) => {
        setRegistrationInfo({ ...registrationInfo, [event.target.name]: event.target.value });
    };



    const register = ()=>{
        console.log(registrationInfo);

        fetch('/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationInfo)
        }).then(res=>res.json()).then(res=>{
           if(res === true){
               console.log('Successful registration!');
                nav('/Menetrendek/Villamos');
           }else if(typeof res === 'string'){
               setError(res);
           }
        });

        setRegistrationInfo({lastName: "", firstName: "", email: "", password: "", zipcode: "", street: "", houseNumber: "",birthDate: ""});
    }

    return(
        <>
            <div className="form">
                <div className="form-body">
                    <form>
                        <h2>Regisztrációs űrlap</h2>
                        {error}

                        <label className="form__label" htmlFor="lastName">Vezetéknév:</label>
                        <input className="form__input" type="text" id="lastName" name="lastName" value={registrationInfo.lastName} onChange={handleChange} placeholder="Teszt"/>

                        <label className="form__label" htmlFor="firstName">Keresztnév:</label>
                        <input className="form__input" type="text" id="firstName"  name="firstName" value={registrationInfo.firstName} onChange={handleChange} placeholder="Elek"/>

                        <label className="form__label" htmlFor="email">Email cím:</label>
                        <input className="form__input" type="email" id="email"  name="email" value={registrationInfo.email} onChange={handleChange} placeholder="gyurcsanyaferi@akigyok-kigyoznak.hu" />

                        <label className="form__label" htmlFor="password">Jelszó:</label>
                        <input className="form__input" type="password"  id="password" name="password" value={registrationInfo.password} onChange={handleChange} placeholder="**********"/>

                        <label className="form__label" htmlFor="zipcode">Irányítószám:</label>
                        <input className="form__input" type="text"  id="zipcode" name="zipcode" value={registrationInfo.zipcode} onChange={handleChange} placeholder="6725"/>

                        <label className="form__label" htmlFor="street">Utca:</label>
                        <input className="form__input" type="text"  id="street" name="street" value={registrationInfo.street} onChange={handleChange} placeholder="Pl: Mars tér"/>

                        <label className="form__label" htmlFor="houseNumber">Házszám:</label>
                        <input className="form__input" type="text"  id="houseNumber" name="houseNumber" value={registrationInfo.houseNumber} onChange={handleChange} placeholder="12"/>

                        <label className="form__label" htmlFor="birthDate">Születési Dátum:</label>
                        <input className="form__input" type="date" id="birthDate" name="birthDate" onChange={handleChange} value={registrationInfo.birthDate}/>

                        <button onClick={register} >Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}



export default Register;