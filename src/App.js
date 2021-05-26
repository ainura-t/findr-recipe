import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import Form from "./components/Form";
import List from "./components/List";
import Recipe from "./components/Recipe";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      recipes: []
    };
  }
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  getRecipe = async (e) => {
    const searchItem = this.state.inputValue;
    e.preventDefault();
    const apiCall = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${searchItem}`
    );
    const data = await apiCall.json();
    this.setState({ recipes: data.recipes });
  };
  render() {
    const { inputValue, recipes } = this.state;
    return (
      <Router>
        <div>
          <header>Find your recipe</header>
          <Switch>
            <Route exact path="/">
              <Form
                handleChange={this.handleChange}
                value={inputValue}
                getRecipe={this.getRecipe}
              />
              <List recipes={recipes} />
            </Route>
            <Route path="/recipe/:title" component={Recipe} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
// publisher: "101 Cookbooks"
// title: "Best Pizza Dough Ever"
// source_url: "http://www.101cookbooks.com/archives/001199.html"
// recipe_id: "47746"
// image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
// social_rank: 100
// publisher_url: "http://www.101cookbooks.com"
