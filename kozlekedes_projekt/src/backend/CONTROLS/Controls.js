const DAO = require('../DAO/TransportationDAO');
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Stop = require('../models/Stop');

class Controls{
    constructor() {
        this.DAO = new DAO();
        this.activeUser = undefined;
    }

    // TODO: Jegyek, bérletek kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Jegyek, bérletek árának módosítása, bejelentkezett felhasználó ellenörzése
    /***
     * A megadott email című usernek megvásárolja a jegyet
     * @param user
     * @param ticket
     * @returns {boolean}
     */
    ticketPurchaseHandler(jaratID){
        if(!(user instanceof User) || !(ID instanceof "number")){
            console.error("Nem megfelelő az email vagy járat ID!");
            return false;
        }
        // Megkapja a járat ID-jét, amiből lekérdezi a jegy azonsoítóját 
        this.DAO.getTicketIdentifierByServiceID(jaratID).then((result)=>{
            if(result instanceof Error || !result){
                console.error("Controls ticketPurchaseHandler getTicketIdentifierByServiceID error ", result)
                return false;
            }
            let ticketIdentifier = result;
        });
        // Megkapja az új jegyet
        user.ticketId = ticketIdentifier;
        this.DAO.updateUserTicketIdentifierQuery().then((result)=>{
            if(result instanceof Error || !result){
                console.error("Controls ticketPurchaseHandler updateUserTicketIdentifierQuery error ", result)
                return false;
            }
            return true;
        });
    }

    /***
     * A bejelentkezett felhasználó jegyét visszaadja
     * @returns {Ticket | boolean}
     */
    getTicketForLoggedInUser(){
        if(this.activeUser) {
            return this.activeUser.ticket;
        }else{
            console.error('No active user!');
            return false;
        }
    }

    // TODO: MEGADOTT AZONOSÍTÓJÚ JEGY ÁRÁNAK ÉS/VAGY TÍPUSÁNAK MÓDOSÍTÁSA (CSAK ADMIN)
    // TODO: MEGADOTT AZONOSÍTÓJÚ JEGY TÖRLÉSE (CSAK ADMIN)

    // TODO: Jegyek bérletek vásárlása logika
    // Vásárlás: Form kitöltése után jegy feltöltése az adatbázisba + jegy hozzárendelése a bejelentkezett  felhasználóhoz ezt hozzáadni

    // TODO: Hírfolyam kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Hírfolyam adatainak lekérése az adatbázisból és a hírfolyamra való felíratkozás kezelése

    // TODO: Vásárlások kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Random bankártya adatok bekérése, nincs mentés

    // TODO: Menetrendek kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Admin felhasználó módosíthatja az adott járatokat, törölhet járatot

    selectAllServiceList(){
        return this.DAO.getAllServiceMagyarulJarat().then(res=>{
           if(res.length > 0){
               return res;
           } else{
               return [];
           }
        });
    }

    selectBuses(){
        return this.DAO.getAllServiceMagyarulJarat().then(res=>{
            let result = [];
            for(let r of res){
                if(r.serviceType === 'BUSZ'){
                    result.push(r);
                }
            }
            return result;
        });
    }


    selectTrams(){
        return this.DAO.getAllServiceMagyarulJarat().then(res=>{
            let resolvetomb = [];
            // console.log("selectTrams",res);
            for (let i of res){
                if(i.serviceType === "VILL"){
                    resolvetomb.push(i);
                }
            }
            return resolvetomb;
        });
    }

    selectTrolleyBuses(){
        return this.DAO.getAllServiceMagyarulJarat().then(res=>{
            let result = [];
            for(let r of res){
                if(r.serviceType === 'TROL'){
                    result.push(r);
                }
            }
            return result;
        })
    }


    // TODO: Felhasználói munkamenet logikája több jogosultsági szinttel (admin, vendég, általános felhasználó)
    // Bejelentkezés, regisztráció és kijelentkezés

    // Ez már hazsnálható a felhasználó bejelentkeztetéséhez
    /**
     * Bejelentkezik a megadott adatokkal, hamissal tér vissza ha sikertelen
     * @param email
     * @param password
     */
    loginByEmailAndPassword(email, password){
        if(typeof email !== "string" || typeof password !== "string"){
            console.error('Controls.loginByEmailAndPassword => ', 'Invalid argument(s)!', email, password);
            return false;
        }
        return this.DAO.getAllUser().then(res=>{
            for(let u of res){
                if(u.email === email && u.password === password){
                    console.log('user found!');
                    this.activeUser = u;
                    console.log(this.activeUser);
                    return true;
                }
            }
            return false;
        }).catch(e=>console.error(e));
    }

    getUsers(){
        return this.DAO.getAllUser().then(res=>{
            return res;
        });
    }

    canRegisterUser(email){
        return this.DAO.getUserByEmail(email).then(res=>{
            return !res;
        })
    }

    registerUser(email, password, firstName, lastName, zipCode, street, house, birthDate){
        let user = new User(email, password, zipCode, street, house, birthDate, firstName, lastName);
        return this.DAO.createUser(user).then(res=>{
            return res;
        }).catch(e=>console.error(e));
    }
}

module.exports = Controls;