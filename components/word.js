import React, {Component} from 'react';

class Verse extends Component {

    constructor(props) {
        super(props);
        this.state = {verseData: null};
        this.getRandomBibleVerse =  this.getRandomBibleVerse.bind(this);
        this.getRandomBibleVerse();


    }

    getRandomBibleVerse(){
        if (this.state.verseData)  this.setState({ verseData: null });


        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'http://labs.bible.org/api/?passage=random&type=json'
        fetch(proxyUrl + targetUrl)
            .then(d => d.json())
            .then(d => {
                this.setState({verseData: d})
            });
    }


    componentDidMount() {
        this.getRandomBibleVerse();
    }




    render() {
        if (!this.state.verseData) return <div className="pls_wait">Please wait...</div>;

        return (
            <div className="row verse_outter">

                    {this.state.verseData.map(info => (
                    <div className="verse_style" key={info.chapter}>
                        <h3>{info.bookname} {info.chapter}:{info.verse}</h3>
                        <p>{info.text}</p>
                        <button className="get_another" onClick={this.getRandomBibleVerse}>Fetch Another</button>

                    </div>
                ))}

            </div>
        )
    }

}
export default Verse;
