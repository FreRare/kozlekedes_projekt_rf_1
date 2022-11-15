import React, {useEffect, useState} from "react";
import './index.scss';
import pepe from '../../assets/pepe.png'

const Profil = () =>{

    const [jegy, setJegy] = useState('');
    /*if(!ticket.identifier) {
        setTicket({
            identifier: 17263,
            validity: 'x-y időpontig érvényes eskü lekérjük majd adatbázisból',
            serviceTheTicketIsFor: 12344
        });
    }*/
    let ticket = {};
    if(jegy.length <= 0) {
        fetch('/api/profile', {
            method: 'GET'
        }).then(res => res.json()).then((res) => {
            if(!res){
                console.log('No ticket found!');
            }else{
                ticket = res.ticketToSend;
                //console.log(ticket);
                setJegy(
                    <>
                        <p>
                            Érvényes: {ticket.validity}
                        </p>
                        <p>
                            Járat: {ticket.serviceTheTicketIsFor}
                        </p>
                        <p>
                            Típus: {ticket.type}
                        </p>
                    </>
                );
            }
        });
    }

    return(
        <>
        <h1>Profil</h1>
        <div className="wrapper">
            <div className="profile-datas">
                <form>
                    <input type="text" className="name" placeholder="Név"></input>
                    <input type="email" className="emailaddress" placeholder="email-cím"></input>
                    <input type="text" className="username" placeholder="Felhasználónév"></input>
                    <input type="date" className="dateofbirth"></input>
                    <input type="submit" value="Változtatások mentése"></input>
                </form>
            </div>
            <div className="history">
                <div className="ticket-infos">
                <h1>EZ AZ UTOLJÁRA VÁSÁROLT JEGYED!!!</h1>
                <div className="pepeimg">
                    <img src={pepe} alt="EzegyPepe"/>
                </div>
                    <div className="ticketdatas">
                        {jegy}
                    </div>
                     
                </div>

            </div>
        </div>
        </>
    );
}

export default Profil;