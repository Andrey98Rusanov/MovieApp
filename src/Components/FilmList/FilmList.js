import React, { Component } from "react";
import "./FilmList.css";
import Film from "../Film/Film";
import Loader from "../../AntdComponents/Loader";

export default class FilmList extends Component {

  render() {
    const films = this.props.loading ? (
      <div className="loader">
        <Loader />
      </div>
    ) : (
      <Film filmData={this.props.filmData} />
    );
    return (
      <>
        {films}
      </>
    );
  }
}