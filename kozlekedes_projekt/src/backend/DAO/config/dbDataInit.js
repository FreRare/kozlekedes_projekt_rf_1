const DAO = require ('../TransportationDAO');
const dataAccessObjectObject = new DAO();

/**
 * Initializes the data in the database
 * Only carefully!
 * Do not run alongside index.js
 */
function init(){

    dataAccessObjectObject.__query('INSERT kategoria, cim, leiras, kozzetetel_datum INTO HIRFOLYAM  VALUES' +
        (1, 'buszozás', 'A szegedi tömegközlekedés időben közlekedik', 'Nemrégiben felmérést végeztek Szegeden, mely kkimutatta, hogy a városban igenis időben közlekednek a tömegkezlekedések. Egyedül csak a kettes villamos késik...', '2022-08-29 19:42:00')
        ()
    )


}

init();