import React, { Component } from "react";
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import "./FilmList.css"

export default class FilmList extends Component {

  async getFilms(){
    const res = await fetch (`https://api.themoviedb.org/3/search/movie?query=Star Wars&api_key=dda4727764b73e18a45ed49f2d35ba07`)
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

  overwiewValidation(str){
    const arr = str.split(" ")
    const resArr = arr.slice(0, 25)
    const resStr = resArr.join(" ")
    if (resStr[resStr.length-1] === ",") return `${resStr.slice(0,-1)}...`
    return `${resStr}...`
  }

  render() {
    let films = []
    console.log(this.state.filmData)
    if (this.state.filmData != null){
      for (let el of this.state.filmData){
        let img = "https://image.tmdb.org/t/p/w500/" + el.poster_path
        let genre = []
        for (let n of el.genre_ids){
          genre.push(<span>{n} </span>)
        }
        films.push(
          <div key = {el.id} className="film">
            <img src={img} alt="poster" className="poster" />
          <div className="film_info">
            <h1 className="title">{el.title}</h1>
            <span className="date">
            {format(new Date(el.release_date), 'MMMM d, yyyy',
            {
            lacale: enGB
          })}
            </span>
              <div className="genre">{genre}</div>
            <div className="discription">{this.overwiewValidation(el.overview)}</div>
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
