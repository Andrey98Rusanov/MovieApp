import React, { Component } from "react";
import debounce from "lodash.debounce";
import FilmList from "../FilmList/FilmList";
import SearchForm from "../SearchForm/SearchForm";
import FilmsService from "../../FilmsService/FilmsService";
import NetWork from "../NetWork/NetWork";
import PaginationFilms from "../../AntdComponents/Pagination";
import { FilmDataProvider } from "../../FilmsService/Film-context";

export default class App extends Component {
  FilmsService = new FilmsService();

  state = {
    label: "",
    totalPages: null,
    totalResults: null,
    filmData: null,
    loading: false,
    internet: true,
    page: 1,
    genres: null,
    guest_id: null,
  };

  componentDidMount() {
    this.FilmsService.guestSession().then((res) =>
      this.setState({ guest_id: res })
    );
    this.FilmsService.getGenres().then((genre) => {
      this.setState({ genres: genre });
    });
    //217316
  }

  addFilms = debounce(() => {
    this.FilmsService.getFilms(this.state.label, this.state.page).then(
      ([arr, pages, results]) => {
        this.setState({
          filmData: arr,
          loading: false,
          totalPages: pages,
          totalResults: results,
          page: 1,
        });
      }
    );
  }, 500);

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
      loading: true,
    });
    let strArr = e.target.value.split("");
    if (strArr[0] !== " " && strArr[strArr.length - 1] !== " ") {
      this.addFilms();
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  onNetworkState = () => {
    this.setState(({ internet }) => {
      return {
        internet: !internet,
      };
    });
  };

  onPageChange(pageN) {
    this.setState({
      page: pageN,
    });
    this.addFilms();
  }

  render() {
    console.log(this.state.guest_id)
    if (this.state.guest_id){
      console.log(this.FilmsService.addRating(217316, 1, this.state.guest_id))
      // console.log(this.FilmsService.getRating(this.state.guest_id))
      setTimeout(()=> console.log(this.FilmsService.getRating(this.state.guest_id), 2000)
      )
      console.log(1)
    }
    return (
      <>
        <FilmDataProvider value={this.state.genres}>
          <SearchForm
            onLabelChange={this.onLabelChange}
            label={this.state.label}
          />
          <NetWork
            onNetworkState={this.onNetworkState}
            internet={this.state.internet}
          />
          <FilmList
            getRating={this.FilmsService.getRating}
            session={this.state.session}
            filmData={this.state.filmData}
            loading={this.state.loading}
            totalResults={this.state.totalResults}
          />
          <PaginationFilms
            loading={this.state.loading}
            filmData={this.state.filmData}
            totalPages={this.state.totalPages}
            onPageChange={this.onPageChange.bind(this)}
          />
        </FilmDataProvider>
      </>
    );
  }
}
