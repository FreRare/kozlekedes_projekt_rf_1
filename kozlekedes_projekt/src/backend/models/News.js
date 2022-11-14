class News{ //HIRFOLYAM
    ID; //ID
    category; //kategoria
    title; //cim
    description; //leiras
    publishDate; //kozzetel_datum

    constructor(ID = 0, category = "", title = "", description = "", publishDate = new Date()) {
        this.ID = ID;
        this.category = category;
        this.title = title;
        this.description = description;
        this.publishDate = publishDate;
    }
}

module.exports = News;