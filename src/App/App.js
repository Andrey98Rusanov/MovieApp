import React, { Component } from "react";
import FilmList from "../FilmList/FilmList";

export default class App extends Component {
  async getFilms() {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=Naruto&api_key=dda4727764b73e18a45ed49f2d35ba07`
    );
    const res1 = await res.json();
    return res1.results;
  }

  state = {
    filmData: null,
  };

  constructor() {
    super();
    this.addFilms();
  }

  addFilms() {
    this.getFilms().then((arr) => {
      this.setState({
        filmData: arr,
      });
    });
  }

  overwiewValidation(str) {
    const arr = str.split(" ");
    const resArr = arr.slice(0, 25);
    const resStr = resArr.join(" ");
    if (resStr[resStr.length - 1] === ",") return `${resStr.slice(0, -1)}...`;
    return `${resStr}...`;
  }

  render() {
    return <FilmList />;
  }
}
