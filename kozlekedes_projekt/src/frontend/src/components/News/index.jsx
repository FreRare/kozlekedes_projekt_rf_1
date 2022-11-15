import React, {useEffect} from 'react';
import './index.scss';
import {useState} from "react";

const News = () => {

    const [news, setNews] = useState(undefined);
    //const [newsDisplay, setNewsDisplay] = useState(<></>);

    let displayNews;

    if(!news) {
        fetch('/api/news', {
            method: 'GET'
        }).then(res => res.json()).then(res => {
            console.log('News in REACT: ', JSON.parse(res));
            displayNews = (JSON.parse(res).map((n, index) => (
                <div className="news-row " key={index}>
                    <h2>{n.title}</h2>
                    <h3>{n.description}</h3>
                </div>

            )));
            setNews(displayNews);
        }).catch(e => console.error(e));
    }

    return(
        <>
            <h1>Hírfolyam</h1>
        <div className="news-wrapper">
            <div className="news-container">
                {news}
            </div>
            <div className="news-subscription">
                <p>Szeretnél feliratkozni hírlevelünkre?</p>
                <p>Írd be e-mail címedet, s küldd el nekünk kérésed</p>
                <form>

                    <input type="email" placeholder="gyurcsanyaferi@akigyok-kigyoznak.hu"></input>

                    <input type="submit" placeholder="Elküldés"></input>

                </form>
            </div>
        </div>
        </>
    );
}

export default News;