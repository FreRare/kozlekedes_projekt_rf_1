import React, {useEffect} from 'react';
import './index.scss';
import {useState} from "react";

const News = () => {

    const [news, setNews] = useState(undefined);
    //const [newsDisplay, setNewsDisplay] = useState(<></>);
    const [error, setError] = useState('');

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

    const [newsData, setNewsData] = useState({
        category: '',
        title: '',
        description: '',
        publishDate: new Date()
    })

    const updateData = (e)=>{
        setNewsData({ ...newsData, [e.target.name]: e.target.value });
        newsData.publishDate = new Date();
    }

    const addNews = ()=>{
        for(let d of newsData){
            if(!d){
                setError('Minden mező kitöltése kötelező!');
                return;
            }
        }
        fetch('/api/createNews', {
         method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        }).then(res=>res.json()).then(res=>{
            if(res.success){
                console.log('News added successfully');
                let newNews = news.push(res.news);
                setNews(newNews);
            }else{
                setError(res.error);
            }
        })
    }

    const  addNewsForAdmin = (
        <>
        <h3>Hír hozzáadása</h3>
    <form>
        <input type="text" placeholder="Kategória" onChange={(e)=>updateData(e)}></input>
        <input type="text" placeholder="Cím" onChange={(e)=>updateData(e)}></input>
        <textarea placeholder="Leírás" onChange={(e)=>updateData(e)}></textarea>
        <button onClick={addNews}>Hír feltöltése</button>
    </form>
        </>
    )

    return(
        <>
            <h1>Hírfolyam</h1>
        <div className="news-wrapper">
            <div className="news-container">
                {news}
            </div>
            <div className="news-subscription">
                {JSON.parse(sessionStorage.getItem('loggedin')).isAdmin && addNewsForAdmin}
            </div>
        </div>
        </>
    );
}

export default News;