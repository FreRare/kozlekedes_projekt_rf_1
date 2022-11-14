const Service = require("./Service");

class Ticket{ //JEGY
    identifier;      //azonosito
    price;   //ar
    type; //tipus
    validity;   //ervenyes
    serviceTheTicketIsFor;     //JARAT.jaratszam

    constructor(identifier = 0, price = 0, type = "", validity = new Date(), serviceTheTicketIsFor=0) {
        this.identifier = identifier;
        this.price = price;
        this.type = type;
        this.validity = validity;
        this.serviceTheTicketIsFor = serviceTheTicketIsFor;
    }
}

module.exports = Ticket;