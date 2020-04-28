import React, { Component } from 'react';
import { Button, Container, Label } from 'reactstrap';

class Category extends Component {
  state = {
    isLoading: true,
    categories: [],
    expenses: []
  }

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();
    this.setState({ isLoading: false, categories: body })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let ex = [...this.state.expenses]
    let pr = { ...this.state.postRequest }
    let nextID = ex[ex.length - 1].id + 1
    pr.id = nextID

    await fetch(`/api/expenses`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pr)
    });
    this.initialLoad();
    this.setState({
      postRequest: {
        id: 0,
        expenseDate: new Date(),
        description: '',
        location: '',
        category: { id: 3, name: 'Grocery' },
        amount: 0
      }
    });
  }

  render() {
    const { isLoading, categories } = this.state;

    if (isLoading) {
      return (<div>Loading...</div>);
    }

    let categoryOptions = categories.map(category =>
      <option value={category.id} key={category.id}>{category.name}</option>
    )

    return (
      <>
        <Container id="cat-container">
          <h2>Current Categories</h2>
          <div className="mt-4">
            {categories.map(category =>
              // <div id={category.id} class="category">{category.name}</div>
              
              <Button id={category.id} className="category">{category.name}</Button>
           
            )}
            <Button id="add-cat">Add New</Button>
          </div>
        </Container>
      </>
    );
  }
}

export default Category;

