import { Component } from "react";

export default class FilmsService extends Component {
  async getFilms(label, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${label}&api_key=dda4727764b73e18a45ed49f2d35ba07&page=${page}`
    );
    const res1 = await res.json();
    console.log(res1)
    return [res1.results, res1.total_pages]
  }
}
