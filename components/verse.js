import React, {Component} from 'react';
class Verse extends Component {

    constructor(props) {
        super(props);
        this.state = {verseData: null};
        this.getRandomBibleVerse = this.getRandomBibleVerse.bind(this);
        this.getPrevBibleVerse = this.getPrevBibleVerse.bind(this);
        this.getNextBibleVerse = this.getNextBibleVerse.bind(this);
        this.getRandomBibleVerse();


    }

    getRandomBibleVerse() {
        if (this.state.verseData) this.setState({verseData: null});
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'http://labs.bible.org/api/?passage=random&type=json'
        fetch(proxyUrl + targetUrl)
            .then(d => d.json())
            .then(d => {
                this.setState({verseData: d})
            });
    }

    getPrevBibleVerse() {
        let verse = parseInt(this.state.verseData[0].verse) - 1;
        verse = verse >= 1 ? verse : 1;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = `http://labs.bible.org/api/?passage=${this.state.verseData[0].bookname}+${this.state.verseData[0].chapter}:${verse}&type=json`

        if (this.state.verseData) this.setState({verseData: null});

        fetch(proxyUrl + targetUrl)
            .then(d => d.json())
            .then(d => {
                this.setState({verseData: d})
            });
    }

    getNextBibleVerse() {
        let verse = parseInt(this.state.verseData[0].verse) + 1;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = `http://labs.bible.org/api/?passage=${this.state.verseData[0].bookname}+${this.state.verseData[0].chapter}:${verse}&type=json`
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

                        <button className="get_verse" onClick={this.getPrevBibleVerse}>Prev</button>
                        <button className="get_verse" onClick={this.getRandomBibleVerse}>Random</button>
                        <button className="get_verse" onClick={this.getNextBibleVerse}>Next</button>
                        <br/>
                        <p className="credits"><a href="http://labs.bible.org">Verses from labs.bible.org</a></p>


                    </div>
                ))}

            </div>
        )
    }

}
export default Verse;
