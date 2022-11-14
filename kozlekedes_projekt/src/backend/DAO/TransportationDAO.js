const Ticket = require('../models/Ticket');
const User = require("../models/User");
const Stop = require('../models/Stop');
const Service = require("../models/Service");
const Pass = require("../models/Pass");
const Stopping = require("../models/Stopping");
const News = require("../models/News");
const {query} = require("express");

class TransportationDAO{
    static QUERIES = {
        getUserQuery: 'SELECT email, jelszo, iranyitoszam, utca, hazszam, szuletesi_datum, vezeteknev, keresztnev, jegyAzonosito, berletAzonosito, adminE FROM UTAS WHERE email = ?',
        createUserQuery: 'INSERT INTO UTAS VALUES(?,?,?,?,?,?,?,?,?,?,?)',
        updateUserQuery: 'UPDATE UTAS SET jelszo = ?, iranyitoszam = ?, utca = ?, hazszam = ?, szuletesi_datum = ?, vezeteknev = ?, keresztnev = ? WHERE email = ?',
        updateUserTicketIdentifierQuery: 'UPDATE UTAS SET jegyAzonosito = ? WHERE email = ?',
        updateUserPassIdentifierQuery: 'UPDATE UTAS SET berletAzonosito = ? WHERE email = ?',
        deleteUserQuery: 'DELETE FROM UTAS WHERE email = ?',
        createServiceQuery: 'INSERT INTO JARAT VALUES(?, ?, ?)',
        updateServiceQuery: 'UPDATE JARAT SET vonalszam =?, tipus= ? WHERE id = ?',
        deleteServiceQuery: 'DELETE FROM JARAT WHERE id =?',
        getServiceQuery: 'SELECT * FROM JARAT WHERE id = ?',
        getAllServiceQuery: "SELECT * FROM JARAT",
        getAllStopQuery: "SELECT * FROM MEGALLO",
        getAllUserQuery: "SELECT * FROM UTAS",
        createTicketQuery: 'INSERT INTO JEGY VALUES(?,?,?,?)',
        updateTicketQuery: 'UPDATE JEGY SET ar = ?, ervenyes = ?, ID = ? WHERE azonosito = ?',
        deleteTicketQuery: 'DELETE FROM UTAS WHERE azonosito = ?',
        getTicketQuery: 'SELECT * FROM JEGY',
        getTicketIdentifierByServiceIDQuery: 'SELECT azonosito FROM JEGY WHERE ID = ?',
        createPassQuery: 'INSERT INTO BERLET VALUES(?,?,?,?)',
        updatePasQuery: 'UPDATE BERLET SET ar = ?, ervenyes = ?, ID = ? WHERE azonosito = ?',
        deletePassQuery: 'DELETE FROM BERLET WHERE azonosito = ?',
        getPassQuery: 'SELECT * FROM BERLET WHERE azonosito = ?',
        createStopQuery: '',
        updateStopQuery: '',
        deleteStopQuery: '',
        getStopQuery: 'SELECT * FROM MEGALLO WHERE nev = ?',
        createStoppingQuery: '',
        updateStoppingQuery: '',
        deleteStoppingQuery: '',
        getStoppingQuery: 'SELECT * FROM MEGALL WHERE ID = ? ORDER BY mikor',
        createNewsQuery: 'INSERT INTO HIRFOLYAM VALUES (?, ?, ?, ?, ?)',
        updateNewsQuery: 'UPDATE HIRFOLYAM SET kategoria = ?, cim = ?, leiras = ? kozzetetel_datum = ?',
        deleteNewsQuery: 'DELETE FROM HIRFOLYAM WHERE ID = ?',
        getNewsQuery: 'SELECT * FROM HIRFOLYAM WHERE ID = ?'
    }
    constructor(){
        this.className = 'TransportationDAO => ';
       // this.router = require('express').Router();
        this.db = require('./config/db');
    }

    /***
     * Az összes adatbázisban szereplő járatot visszaadja
     * @returns {Promise<Array<Service>>}
     */
    getAllServiceMagyarulJarat(){
        // Query elvégzése
        // Query egy tömböt ad vissza promiseként kezeljük
            return new Promise((resolve, reject)=> {
                let queryResult =[];
                this.db.query(TransportationDAO.QUERIES.getAllServiceQuery, (error, result, next) => {
                    if (error) throw (error);
                    if (result && result.length > 0) {
                        console.log(this.className, 'Successful query!');
                    } else {
                        console.log(this.className, 'Empty query result!!');
                    }
                    // Konvertálás Service Típusra
                    for (let ser of result) {
                        let lofasz = new Service(ser['ID'],ser['vonalszam'], ser['tipus']);
                        this.getStopping(lofasz.id).then((res)=>{
                            for(let i of res){
                                lofasz.stops.push(i);
                            }
                        }).then(()=>{
                            //console.log(lofasz);
                            queryResult.push(lofasz);
                        })
                    }
                    setTimeout(()=>{
                        //console.log("getAllservices", queryResult);
                        resolve(queryResult);
                    }, 1000);
                });
            });
    }

    /**
     *Az össes megállót visszaadja
     * @returns {Promise<Array<Stop>>}
     */
    getAllStopMagyarulMegallo(){
        return new Promise((resolve, reject)=>{
        let result = []
        this.db.query(TransportationDAO.QUERIES.getAllStopQuery, (err, res, next)=>{
            if (err) throw err;
            console.log(this.className, 'Result of query: ', res);
            for(let s of res){
                result.push(new Stop(s['nev'], s["hely"]))
            }
            resolve(result);
        });
        });
    }

    createUser(user){
        return new Promise((resolve, reject)=>{
            if(!user instanceof User){
                console.error('Inavlid user!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createUserQuery, [user.email, user.password, user.zipCode, user.street, user.houseNumber, user.birthDate, user.firstName, user.lastName, user.ticket, user.passId, user.isAdmin], (err, result) => {
                if(err){
                    throw(err);
                }
                console.log("Sikeres felhasználó létrehozás!");
                resolve(true);
            })
        })
    }

    updateUser(user){
        return new Promise((resolve, reject)=>{
            if(!user instanceof User){
                console.error('Inavlid user!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateUserQuery, [user.password, user.zipCode, user.street, user.houseNumber, user.birthDate, user.firstName, user.lastName , user.email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    updateUserTicketIdentifier(identifier, email) {
        return new Promise((resolve, reject)=>{
            if(!identifier instanceof 'number' || !email instanceof 'string'){
                console.error('Inavlid identifier or email!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateUserTicketIdentifierQuery, [identifier, email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres jegyvásárlás!");
                resolve(result);
            })
        })
    }

    updateUserPassIdentifier(identifier, email) {
        return new Promise((resolve, reject)=>{
            if(!identifier instanceof 'number' || !email instanceof 'string'){
                console.error('Inavlid identifier or email!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateUserPassIdentifierQuery, [identifier, email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres bérletvásárlás!");
                resolve(result);
            })
        })
    }

    deleteUser(email){
        return new Promise((resolve, reject)=>{
            if(!user instanceof User){
                console.error('Inavlid user!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteUserQuery, [email], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Felhasználó törölve!");
                resolve(result);
            })
        })
    }

    /**
     * Megkeresi az adott jelszóval rendelkező felhasználót
     * @param email
     * @returns {Promise<User | boolean>} False ha hiba van, a User más esetben
     */
    getUserByEmail(email){
        return new Promise((resolve, reject)=>{
            if(typeof email !=='string'){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getUserQuery, [email], (err, result, next)=>{
                if(err)throw(err);
                //console.log('User got by email:', email, 'successfully', result);
                let res = result[0];
                //console.log(res);
                this.getTicketByIdentifier(res["jegyAzonosito"]).then(ticket=>{
                    //console.log(res);
                    resolve(new User(res['email'], res['jelszo'], res['iranyitoszam'], res['utca'], res['hazszam'], res['szuletesi_datum'], res['vezeteknev'], res['keresztnev'], ticket, res['berletAzonosito'], res['adminE']));
                });
            });
        })
    }

    /**
     * Gets all the users from the db
     * @returns {Promise<Array<User>>}
     */
    getAllUser(){
        return new Promise((resolve, reject)=>{
            this.db.query(TransportationDAO.QUERIES.getAllUserQuery, (err, result)=>{
                if(err)throw err;
                let results = [];
                for(let res of result){
                    results.push(new User(res['email'], res['jelszo'], res['iranyitoszam'], res['utca'], res['hazszam'], res['szuletesi_datum'], res['vezeteknev'], res['keresztnev'], res['JEGYID'], res['BERLETID'], res['adminE']));
                }
                resolve(results);
            })
        })
    }

    createService(service){
        return new Promise((resolve, reject)=>{
            if(!service instanceof Service){
                console.error('Inavlid service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createServiceQuery, [service.ID, service.serviceNumber, service.serviceType], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres járat létrehozás!");
                resolve(result);
            })
        })
    }

    updateService(service){
        return new Promise((resolve, reject)=>{
            if(!service instanceof Service){
                console.error('Inavlid service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateServiceQuery, [service.serviceNumber, service.serviceType], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deleteService(id){
        return new Promise((resolve, reject)=>{
            if(typeof  id !== "number"){
                console.error('Invalid Service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteServiceQuery, [id], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Járat törölve!");
                resolve(result);
            })
        })
    }

    getService(id){
        return new Promise((resolve, reject)=>{
            if(typeof id !=="number"){
                console.error('Invalid Service!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getServiceQuery, [id], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Járat visszaadva!");
                // TODO: resolve(valami) valami legyen egy Service objektum, helyesen feltöltve, a result[0]['jaratszam'] segít.
                resolve(new Service(result["name"], result["location"]));
            })
        })
    }

    createTicket(ticket){
        return new Promise((resolve, reject)=>{
            if(!ticket instanceof Ticket){
                console.error('Inavlid ticket!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createTicketQuery, [ticket.identifier, ticket.price, ticket.type, ticket.validity, ticket.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres jegy létrehozás!");
                resolve(result);
            })
        })
    }

    updateTicket(ticket){
        return new Promise((resolve, reject)=>{
            if(!ticket instanceof Ticket){
                console.error('Inavlid ticket!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateTicketQuery, [ticket.price, ticket.type, ticket.validtiy, ticket.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deleteTicket(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteTicketQuery, [identifier], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Jegy törölve!");
                resolve(result);
            })
        })
    }

    getTicketByIdentifier(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getTicketQuery,  [identifier], (err, res, next)=>{
                if(err)throw(err);
                console.log('Ticket got by identifier successfully');
                res = res[0];
                this.getService(res['ID']).then(service=>{
                    resolve(new Ticket(res['AZONOSITO'], res['AR'], res['TIPUS'], new Date(res['ERVENYES']), service.id));
                }).catch(e=>console.log(e));
            });
        });
    }

    getTicketIdentifierByServiceID(ID) {
        return new Promise((resolve, reject)=>{
            if(typeof ID !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getTicketIdentifierByServiceIDQuery,  [ID], (err, res, next)=>{
                if(err)throw(err);
                console.log('Ticket got by Service ID successfully');
                res = res[0];
                this.getService(res['ID']).then(service=>{
                    resolve(new Ticket(res['AZONOSITO'], res['AR'], res['TIPUS'], new Date(res['ERVENYES']), service.id));
                }).catch(e=>console.log(e));
            });
        });
    }

    createPass(pass){
        return new Promise((resolve, reject)=>{
            if(!pass instanceof Pass){
                console.error('Inavlid pass!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createPassQuery, [pass.identifier, pass.price, pass.type, pass.validity, pass.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres bérlet létrehozás!");
                resolve(result);
            })
        })
    }

    updatePass(pass){
        return new Promise((resolve, reject)=>{
            if(!pass instanceof Pass){
                console.error('Inavlid pass!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updatePasQuery, [pass.price, pass.type, pass.validtiy, pass.ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deletePass(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deletePassQuery, [identifier], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Bérlet törölve!");
                resolve(result);
            })
        })
    }

    getPassByIdentifier(identifier){
        return new Promise((resolve, reject)=>{
            if(typeof identifier !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getPassQuery,  [identifier], (err, res, next)=>{
                if(err)reject(err);
                console.log('Pass got by identifier successfully');
                resolve(new Ticket(res['AZONOSITO'], res['AR'], res['TIPUS'], res['ERVENYES'], res['ID']));
            })
        })
    }

    createStop(stop){
        return new Promise((resolve, reject)=>{
            if(!stop instanceof Stop){
                console.error('Invalid Stop!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createStopQuery, [stop.name, stop.location], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres megálló létrehozás!");
                resolve(result);
            })
        })
    }

    updateStop(stop){
        return new Promise((resolve, reject)=>{
            if(!stop instanceof Stop){
                console.error('Invalid Stop!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateStopQuery, [stop.name, stop.location], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres megálló módosítás!");
                resolve(result);
            })
        })
    }

    deleteStop(name){
        return new Promise((resolve, reject)=>{
            if(typeof name === "string"){
                console.log("Invalid Stop!")
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteStopQuery, [name], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló törölve!");
                resolve(result);
            })
        })
    }

    getStop(name){
        return new Promise((resolve, reject)=>{
            if(typeof name !== "string"){
                console.error('Invalid Stop!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getStopQuery, [name], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló visszaadva!");
                console.log(result);
                resolve(new Stop(result["nev"], result["hely"]));
            })
        })
    }

    getStopping(id){
        return new Promise((resolve, reject)=>{
            if(typeof id !== "number"){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getStoppingQuery, [id], (err, result) => {
                if(err){
                    throw err;
                }
                if(result.length <= 0){
                    console.error("Ez a járat nem üzemel (nincsenek megállói)!");
                }
                // console.log("Megáll visszaadva!");
                let stoppings = [];
                for(let res of result) {
                    stoppings.push(new Stopping(res["ID"], res["nev"], res["mikor"]));
                }
                resolve(stoppings);
            })
        })
    }

    createNews(news){
        return new Promise((resolve, reject)=>{
            if(!news instanceof News){
                console.error('Inavlid news!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createNewsQuery, [news.ID, news.category, news.title, news.description, news.publishDate], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres hír létrehozás!");
                resolve(result);
            })
        })
    }

    updateNews(news){
        return new Promise((resolve, reject)=>{
            if(!news instanceof News){
                console.error('Inavlid news!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateNewsQuery, [news.category, news.title, news.description, news.publishDate], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Sikeres adatmódosítás!");
                resolve(result);
            })
        })
    }

    deleteNews(ID){
        return new Promise((resolve, reject)=>{
            if(typeof ID !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteNewsQuery, [ID], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Hír törölve!");
                resolve(result);
            })
        })
    }

    getNewsByID(ID){
        return new Promise((resolve, reject)=>{
            if(typeof ID !=="number"){
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.getNewsQuery,  [ID], (err, res, next)=>{
                if(err)reject(err);
                console.log('News got by ID successfully');
                resolve(new Ticket(res['KATEGORIA'], res['CIM'], res['LEIRAS'], res['KOZZETETEL_DATUM'], res['ID']));
            })
        })
    }
    createStopping(stopping){
        return new Promise((resolve, reject)=>{
            if(!stopping instanceof Stopping){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.createStoppingQuery, [stopping.id, stopping.name, stopping.when], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló létrehozva!");
                resolve(result);
            })
        })
    }

    updateStopping(stopping){
        return new Promise((resolve, reject)=>{
            if(!stopping instanceof Stopping){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.updateStoppingQuery, [stopping.id, stopping.name, stopping.when], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló módosítva!");
                resolve(result);
            })
        })
    }

    deleteStopping(id, name){
        return new Promise((resolve, reject)=>{
            if(typeof id !== "number" || typeof name !== "string"){
                console.error('Invalid Stopping!')
                reject(false);
            }
            this.db.query(TransportationDAO.QUERIES.deleteStoppingQuery, [id, name], (err, result) => {
                if(err){
                    reject(err);
                }
                console.log("Megálló törölve!");
                resolve(result);
            })
        })
    }


}

module.exports = TransportationDAO;