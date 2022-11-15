import React from "react";
import './index.scss';

const Help = () =>{
    return(
<>
<h1>Segítség</h1>
<div className="formholder">
    <div className="text-area">
        <p>Történ valami probléma az oldal használata közben?</p>
        <p>Írj nekünk, és segítünk!</p>
    </div>

    <form>
        <input type="email" placeholder="Gyurcsanyaferi@akigyok-kigyoznak.hu"></input>
        <input type="text" placeholder="Probléma témájának megnevezése"></input>
        <input type="textarea" placeholder="Probléma kifejtése"></input>
        <input type="submit" value="Küldés"></input>
    </form>
</div>
</>
    );
}

export default Help;