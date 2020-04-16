import React, { Component } from 'react';

class Category extends Component {
  state = {
    isLoading: true,
    categories: []
  }

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();
    this.setState({ isLoading: false, categories: body })
  }

  render() {
    const { isLoading, categories } = this.state;
    
    if (isLoading) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <h2>Categories</h2>
        {categories.map(category => 
          <div id={category.id}>{category.name}</div>
        )}
      </div>
    );
  }
}

export default Category;

