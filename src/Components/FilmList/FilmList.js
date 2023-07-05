import React, { Component } from "react";
import "./FilmList.css";
import Film from "../Film/Film";
import Loader from "../../AntdComponents/Loader";
import { FilmDataConsumer } from "../../FilmsService/Film-context";

export default class FilmList extends Component {

  render() {
    // console.log(this.props.getRating(this.props.session))
    const films = this.props.loading ? (
      <div className="loader">
        <Loader />
      </div>
    ) : (
      <FilmDataConsumer>
        {
          (val) => {
            return (
              <Film filmData={this.props.filmData} genres={val}/>
            )
          }
        }
      </FilmDataConsumer>
    );
    const results =
      this.props.totalResults !== null && this.props.loading === false ? (
        <div className="foundFilms">{`Found ${this.props.totalResults} films`}</div>
      ) : null;
    return (
      <>
        {results}
        {films}
      </>
    );
  }
}
