import React, { Component } from "react";

export default class RatedButtons extends Component {


    onRatedClick = () => {
        this.props.Rated()
        this.props.getRatedFilms()
    }

    render() {
        return (
            <>
                <button onClick={this.onRatedClick}>Rated</button>
                <button onClick={this.props.Search}>Search</button>
            </>
        )
    }
}