import React, { Component } from "react";
import { Tabs } from "antd";

export default class RatedButtons extends Component {
  onChange = (key) => {
    if (key === "1") this.props.Search();
    if (key === "2") this.onRatedClick();
  };

  onRatedClick = () => {
    this.props.Rated();
    this.props.getRatedFilms();
  };

  render() {
    const items = [
      {
        key: "1",
        label: `Search`,
      },
      {
        key: "2",
        label: `Rated`,
      },
    ];
    return (
      <div className="tabs">
        <Tabs defaultActiveKey="1" items={items} onChange={this.onChange} />
      </div>
    );
  }
}
