import { Component } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Rate } from "antd";
import PropTypes from "prop-types";

export default class Film extends Component {
  state = {
    rating: 0,
    rated: false,
  };

  overwiewValidation(str) {
    const arr = str.split(" ");
    if (arr.length < 40) return str;
    const resArr = arr.slice(0, 40);
    const resStr = resArr.join(" ");
    if (resStr[resStr.length - 1] === ",") return `${resStr.slice(0, -1)}...`;
    return `${resStr}...`;
  }

  dateValidation(str) {
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

  posterValidation(img) {
    if (img === null) {
      return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
    }
    return "https://image.tmdb.org/t/p/w500/" + img;
  }

  onRatingChange(rat, id, guest_id) {
    this.props.addRating(id, rat, guest_id);
    this.setState({ rating: rat, rated: true });
  }

  ratingClass = (n) => {
    if (n >= 0 && n <= 3) return "rating low";
    if (n > 3 && n <= 5) return "rating middle";
    if (n > 5 && n <= 7) return "rating high";
    if (n > 7) return "rating very-high";
  };

  render() {
    const { filmData, genres, guest_id, ratedFilms, search } = this.props;

    function FindGenres(id) {
      return genres.genres.find((el) => el.id === id).name;
    }
    const filmOrRated = search ? filmData : ratedFilms;
    let films = [];
    if (filmData != null) {
      for (let el of filmOrRated) {
        let genre = [];
        for (let n of el.genre_ids) {
          genre.push(<span>{FindGenres(n)} </span>);
        }
        const rating = () => {
          if (ratedFilms.length !== 0) {
            if (ratedFilms.find((f) => f.id === el.id) !== undefined) {
              return ratedFilms.find((f) => f.id === el.id).rating;
            }
          } else return 0;
        };
        films.push(
          <div key={el.id} className="film">
            <img
              src={this.posterValidation(el.poster_path)}
              alt="poster"
              className="poster"
            />
            <div className="film_info">
              <h3 className="title">{el.title}</h3>
              {this.dateValidation(el.release_date)}
              <div className="genre">{genre}</div>
              <div className="discription">
                {this.overwiewValidation(el.overview)}
              </div>
              <Rate
                onChange={(rat) => this.onRatingChange(rat, el.id, guest_id)}
                count={10}
                defaultValue={rating()}
              />
              <div className={this.ratingClass(el.vote_average)}>
                {el.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        );
      }
    }

    return <div className="films">{films}</div>;
  }
}

Film.defaultProps = {
  filmData: [],
  genres: [],
  guest_id: 1,
  ratedFilms: [],
  search: true,
  addRating: () => {},
};

Film.propTypes = {
  filmData: PropTypes.array,
  genres: PropTypes.array,
  guest_id: PropTypes.number,
  ratedFilms: PropTypes.array,
  search: PropTypes.bool,
  addRating: PropTypes.func,
};
