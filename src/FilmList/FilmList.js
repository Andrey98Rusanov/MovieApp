import React, { Component } from "react";
import Loader from "../Loader/Loader";
import "./FilmList.css";
import Film from "../Film/Film";

export default class FilmList extends Component {
  async getFilms() {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=Star Wars&api_key=dda4727764b73e18a45ed49f2d35ba07`
    );
    const res1 = await res.json();
    return res1.results;
  }

  state = {
    filmData: null,
    loading: true
  };

  constructor() {
    super();
    this.addFilms();
  }

  addFilms() {
    this.getFilms().then((arr) => {
      this.setState({
        filmData: arr,
        loading: false
      });
    });
  }

  render() {
    const laoder = this.state.loading ? <div className="loader"><Loader/></div> : null
    return (
      <>
      {laoder}
      <Film filmData = {this.state.filmData}/>;
      </>
    )
  }
}