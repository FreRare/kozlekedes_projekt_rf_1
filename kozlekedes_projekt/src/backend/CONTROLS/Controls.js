const DAO = require('../DAO/TransportationDAO');
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Stop = require('../models/Stop');
const News = require('../models/News');

class Controls{
    constructor() {
        this.className = 'CONTROLS => ';
        this.DAO = new DAO();
        this.activeUser = new User();
    }

    // TODO: Jegyek, bérletek kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Jegyek, bérletek árának módosítása, bejelentkezett felhasználó ellenörzése

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

    /**
     * Megkapod a híreket
     * @returns {Promise<Array<News>>}
     */
    async getNews(){
        return await this.DAO.getNewsFoloslegesIdAlapjan().then(res=>{
            //console.log(this.className, res);
            return res;
        }).catch(e=>console.error(e));
    }


    // TODO: Vásárlások kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Random bankártya adatok bekérése, nincs mentés

    /***
     * A megadott email című usernek megvásárolja a jegyet
     * @param jaratID
     * @returns {boolean}
     */
    async ticketPurchaseHandler(jaratID){
        if(typeof jaratID !== "number"){
            console.error("Nem megfelelő az email vagy járat ID!");
            return false;
        }
        let ticketIdentifier;
        // Megkapja a járat ID-jét, amiből lekérdezi a jegy azonsoítóját
        return await this.DAO.getTicketByServiceID(jaratID).then((result) => {
            console.log('CONTOLS: ', result);
            ticketIdentifier = result.identifier;
            // Megkapja az új jegyet
            this.activeUser.ticket = result;
            console.log('Ticket to buy id: ', ticketIdentifier);
            return this.DAO.updateUserTicketIdentifier(ticketIdentifier, this.activeUser.email).then((result) => {
                if(result) {
                    console.log('User ticket successfully updated.');
                    return true;
                }else{
                    return false;
                }
            }).catch(e=>console.error(e));
        }).catch(e=>console.error(e));
    }


    // TODO: Menetrendek kezeléséhez tartozó üzleti logika (listázás, módosítás, létrehozása, törlése)
    // Admin felhasználó módosíthatja az adott járatokat, törölhet járatot

    selectAllServiceList(){
        if(this.DAO.serviceList.length > 0){
            return this.DAO.serviceList;
        }
        return this.DAO.getAllServiceMagyarulJarat().then(res=>{
           if(res.length > 0){
               return res;
           } else{
               return [];
           }
        });
    }

    selectBuses(){
        if(this.DAO.serviceList.length > 0){
            let result = [];
            for(let r of this.DAO.serviceList){
                if(r.serviceType === 'BUSZ'){
                    result.push(r);
                }
            }
            return result;
        }
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
        if(this.DAO.serviceList.length > 0){
            let result = [];
            for(let r of this.DAO.serviceList){
                if(r.serviceType === 'VILL'){
                    result.push(r);
                }
            }
            return result;
        }
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
        if(this.DAO.serviceList.length > 0){
            let result = [];
            for(let r of this.DAO.serviceList){
                if(r.serviceType === 'TROL'){
                    result.push(r);
                }
            }
            return result;
        }
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
     * @returns {boolean}
     */
    async loginByEmailAndPassword(email, password){
        if(typeof email !== "string" || typeof password !== "string"){
            console.error('Controls.loginByEmailAndPassword => ', 'Invalid argument(s)!', email, password);
            return false;
        }
        return await this.DAO.getUserByEmail(email).then(res=>{
            console.log('user found!');
            this.activeUser = res;
            //console.log(this.activeUser);
            return true;
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