import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"

class App extends Component {

  async getFilms(){
    const res = await fetch (`https://api.themoviedb.org/3/search/movie?query=Naruto&api_key=dda4727764b73e18a45ed49f2d35ba07`)
    const res1 = await res.json()
    return res1.results
  }

  state = {
    filmData: null
  }

  constructor(){
    super();
    this.addFilms();
  }

  addFilms(){
    this.getFilms().then((arr) => {
      this.setState({
        filmData: arr
      })
    })
  }

  render() {
    console.log(this.state.filmData)
    let films = []
    if (this.state.filmData != null){
      for (let el of this.state.filmData){
        let img = "https://image.tmdb.org/t/p/w500/" + el.poster_path
        let genre = []
        for (let n of el.genre_ids){
          genre.push(<span>{n} </span>)
        }
        films.push(
          <div key = {el.id} className="film">
            <img src={img} className="poster"></img>
          <div className="film_info">
            <h1 className="title">{el.title}</h1>
            <span className="date">{el.release_date}</span>
              <div>{genre}</div>
            <div className="discription">{el.overview}</div>
          </div>
        </div>
        )
      }
    }
   
    return (
      <div className="films">{films}</div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
