import React, { Component } from "react";
import RecipeCards from "./RecipeCards";
import "./FetchData.css";
import SearchRecipe from "./SearchRecipe";
import WelcomeBanner from "./WelcomeBanner";

export default class FetchData extends Component {
  state = {
    loading: true,
    foodData: [],
    error: false,
    query: "pasta recipe"
  };

  invokeAPIToFetchData = async () => {
    try {
      const foodItems = await fetch(
        `https://api.spoonacular.com/food/products/search?query=${this.state.query}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const parsedFoodItems = await foodItems.json();
      this.setState({
        loading: false,
        foodData: parsedFoodItems.products
      });
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  componentDidMount = async () => this.invokeAPIToFetchData();

  changeQuery = searchQuery => {
    this.setState({ query: searchQuery }, () => {
      this.invokeAPIToFetchData();
    });
  };
  render() {
    const displayData = this.state.foodData.map(item => {
      return (
        <RecipeCards
          imageUrl={item.image}
          title={item.title}
          recipeID={item.id}
        />
      );
    });

    return this.state.loading ? (
      <div> Data Loading ... </div>
    ) : (
      <div>
        <WelcomeBanner />
        <SearchRecipe changeQuery={this.changeQuery} />
        <div className="displayRecipeCard">{displayData}</div>
      </div>
    );
  }
}
