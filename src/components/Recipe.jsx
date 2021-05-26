import React from "react";
import { Link } from "react-router-dom";
import "./recipe.css";
class Recipe extends React.Component {
  constructor() {
    super();
    this.state = {
      currentRecipe: {}
    };
  }
  fetchRecipe = async () => {
    const id = this.props.location.state.id;
    const req = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const res = await req.json();
    this.setState({ currentRecipe: res.recipe });
  };
  componentDidMount = () => {
    this.fetchRecipe();
  };
  render() {
    const {
      title,
      publisher,
      image_url,
      publisher_url
    } = this.state.currentRecipe;
    console.log(this.state.currentRecipe.publisher_url);
    return (
      <div className="img">
        <p className="title">{title}</p>
        <img src={image_url} alt={title} />
        <p>{publisher}</p>

        <Link to="/">
          {" "}
          <button>go back</button>
        </Link>
        <a href={publisher_url} target="_blank">
          link
        </a>
      </div>
    );
  }
}
export default Recipe;
