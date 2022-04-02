import React, { Component } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./Arrows.js";
import MovieCard from "./MovieCard.js";

class List extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  state = {
    movies: [],
    movie: {}
  };

  componentDidMount() {
    this.mounted = true;
    const url =
      typeof this.props.apiCall === "number"
        ? `https://api.themoviedb.org/3/discover/movie?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${
            this.props.apiCall
          }`
        : `https://api.themoviedb.org/3/movie/${this.props.apiCall}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (this.mounted) this.setState({ movies: data.results });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { movies } = this.state;
    const menu = movies.map(movie => {
      return (
        <MovieCard key={movie.id} itemId={movie.id} movie={movie}/>
      );
    });

    return (
      <div className="lists">
        <h2>{this.props.heading}</h2>

        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          dragging={true}
          wheel={false}
          alignCenter={false}
          clickWhenDrag={false}
        >
          {menu}
        </ScrollMenu>
      </div>
    );
  }
}

export default List;
