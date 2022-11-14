import './index.scss';

const News = () => {
    return(
        <>
        <div className="news-wrapper">
        <h1>Hírfolyam</h1>
            <div className="news-container">
                
                <div className="news-row ">
            <h2>Cím</h2>
            <h3>Téma</h3>
                </div>
                <div className="news-row ">
            <h2>Cím</h2>
            <h3>Téma</h3>
                </div>
                <div className="news-row ">
            <h2>Cím</h2>
            <h3>Téma</h3>
                </div>
                <div className="news-row">
            <h2>Cím</h2>
            <h3>Téma</h3>
                </div>
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