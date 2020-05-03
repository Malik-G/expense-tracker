import React, { Component } from 'react';
import { Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class Category extends Component {
  state = {
    isLoading: true,
    categories: [],
    expenses: [],
    modalNew: false,
    modalExisting: false,
    newCategory: { id: 0, name: '' },
    existingCategory: { id: 0, name: '' }
  }

  componentDidMount() {
    this.initialLoad();
  }

  async initialLoad() {
    const categoryFetch = await fetch('/api/categories');
    const categoryResposne = await categoryFetch.json();
    this.setState({ isLoading: false, categories: categoryResposne })

    const expenseFetch = await fetch('/api/expenses');
    const expensesResponse = await expenseFetch.json()
    this.setState({ isLoading: false, expenses: expensesResponse })
  }

  addCategory = async (event) => {
    let cat = [...this.state.categories]
    let pr = { ...this.state.newCategory }
    let nextID = cat[cat.length - 1].id + 1
    pr.id = nextID

    await fetch(`/api/category`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pr)
    });
    this.initialLoad();
    this.setState({
      modalNew: !this.state.modalNew,
      newCategory: { id: 0, name: '' }
    });
  }

  deleteCategory = async () => {
    if (window.confirm("Are you sure?") === false) {
      return
    }
    else {
      await fetch(`/api/category/${this.state.existingCategory.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        let updatedCategories = [...this.state.categories].filter(c => c.id !== this.state.existingCategory.id);
        this.setState({
          categories: updatedCategories,
          modalExisting: !this.state.modalExisting
        });
      });
    }
  }

  handleChange = (type) => {
    return (event) => {
      if (type === "new") {
        const categoryValue = event.target.value;
        let newCategory = { ...this.state.newCategory };
        newCategory.name = categoryValue;
        this.setState({ newCategory });
      }
      else{
        const categoryValue = event.target.value;
        let existingCategory = { ...this.state.existingCategory };
        existingCategory.name = categoryValue;
        this.setState({ existingCategory });
      }
    }
  }

  toggleExisitingCat = (idToUpdate, nameToUpdate) => {
    let existingCategory = { ...this.state.existingCategory };
    existingCategory.id = idToUpdate;
    existingCategory.name = nameToUpdate;
    this.setState({
      modalExisting: !this.state.modalExisting,
      existingCategory: existingCategory
    });
  }

  toggleNewCat = () => {
    console.log(this.state.expenses)
    console.log(this.state.categories)
    this.setState({ modalNew: !this.state.modalNew });
  }

  updateCategory = async () => {
    await fetch(`/api/category/${this.state.existingCategory.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.existingCategory)
    }).then(() => {
      this.initialLoad();
      this.setState({ modalExisting: !this.state.modalExisting });
    });
  }

  render() {
    const { isLoading, categories, modalNew, modalExisting } = this.state;

    if (isLoading) {
      return (<div>Loading...</div>);
    }
    // console.log(this.state.newCategory)
    return (
      <>
        <div className="categories-img"></div>
        <Container id="cat-container">
          <h2>Current Categories</h2>
          <div className="mt-4">
            {categories.map(category =>
              <Button id={category.id} className="category" onClick={() => this.toggleExisitingCat(category.id, category.name)}>{category.name}</Button>
            )}
            <Button id="add-cat" onClick={this.toggleNewCat}>Add New</Button>
          </div>
        </Container>

        <Modal isOpen={modalNew} toggle={this.toggleNewCat} unmountOnClose={false}>
          <ModalHeader toggle={this.toggle}>Add a Category</ModalHeader>
          <ModalBody>
            <Input type="text" value={this.state.newCategory.name} onChange={this.handleChange("new")} placeholder="" rows={5} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addCategory}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewCat}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalExisting} toggle={this.toggleExisitingCat} unmountOnClose={false}>
          <ModalHeader toggle={this.toggle}>Edit Category</ModalHeader>
          <ModalBody>
            <Input type="text" value={this.state.existingCategory.name} onChange={this.handleChange("existing")} placeholder="" rows={5} />
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.updateCategory}>Edit</Button>
            <Button color="danger" onClick={this.deleteCategory}>Delete</Button>
            <Button color="secondary" onClick={this.toggleExisitingCat}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Category;

