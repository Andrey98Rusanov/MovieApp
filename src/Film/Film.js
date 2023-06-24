import React from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

function Film({ filmData }) {
  function overwiewValidation(str) {
    const arr = str.split(" ");
    if (arr.length < 40) return str;
    const resArr = arr.slice(0, 40);
    const resStr = resArr.join(" ");
    if (resStr[resStr.length - 1] === ",") return `${resStr.slice(0, -1)}...`;
    return `${resStr}...`;
  }

  function dateValidation(str) {
    if (str !== "") {
      return (
        <span className="date">
          {format(new Date(str), "MMMM d, yyyy", {
            lacale: enGB,
          })}
        </span>
      );
    }
    return null;
  }

  function posterValidation(img) {
    if (img === null) {
      return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
    }
    return "https://image.tmdb.org/t/p/w500/" + img;
  }

  let films = [];
  console.log(filmData);
  if (filmData != null) {
    for (let el of filmData) {
      let genre = [];
      for (let n of el.genre_ids) {
        genre.push(<span>{n} </span>);
      }
      films.push(
        <div key={el.id} className="film">
          <img
            src={posterValidation(el.poster_path)}
            alt="poster"
            className="poster"
          />
          <div className="film_info">
            <h1 className="title">{el.title}</h1>
            {dateValidation(el.release_date)}
            <div className="genre">{genre}</div>
            <div className="discription">{overwiewValidation(el.overview)}</div>
          </div>
        </div>
      );
    }
  }

  return <div className="films">{films}</div>;
}

export default Film;
