import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Container, Input, Button, Label, FormGroup, Form } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';

class Expenses extends Component {

  state = {
    date: new Date(),
    isLoading: true,
    categories: [],
    expenses: [],
    postRequest: {
      id: 0,
      expenseDate: new Date(),
      description: '',
      location: '',
      category: { id: 3, name: 'Grocery' },
      amount: 0
    }
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

  deleteExpense = async (id) => {
    if (window.confirm("Are you sure?") === false) {
      return
    }
    else {
      await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        let updatedExpenses = [...this.state.expenses].filter(e => e.id !== id);
        this.setState({ expenses: updatedExpenses });
      });
    }
  }

  handleChange = (event) => {
    const objProperty = event.target.name;
    const objPropertyValue = event.target.value;
    let postRequest = { ...this.state.postRequest };
    postRequest[objProperty] = objPropertyValue;
    this.setState({ postRequest: postRequest });
  }

  handleCategoryChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedId = event.target.options[selectedIndex].value
    const selectedName = event.target.options[selectedIndex].innerHTML;
    const postRequest = { ...this.state.postRequest };
    postRequest.category = {
      id: selectedId,
      name: selectedName
    }
    this.setState({ postRequest })
  }

  handleDateChange = (date) => {
    let postRequest = { ...this.state.postRequest };
    console.log(moment(date).format('YYYY-MM-DD'))
    postRequest.expenseDate = date;
    this.setState({ postRequest });
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
    const title = <h3>Add Expense</h3>;
    const { categories } = this.state;
    const { expenses, isLoading } = this.state;

    if (isLoading) {
      return (<div>Loading...</div>);
    }

    let categoryOptions = categories.map(category =>
      <option value={category.id} key={category.id}>{category.name}</option>
    )
    return (
      <>
        <div className="expenses-img"></div>
        <Container id="form-container">
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input value={this.state.postRequest.description} type="text" name="description" id="description" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount:</Label>
              <Input value={this.state.postRequest.amount} type="number" name="amount" id="amount" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category:</Label>
              <select className="ml-2" onChange={this.handleCategoryChange}>
                {categoryOptions}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="expenseDate">Date:</Label>
              <DatePicker selected={this.state.postRequest.expenseDate} className="ml-2" id="expenseDate" onChange={this.handleDateChange} />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location:</Label>
              <Input value={this.state.postRequest.location} type="text" name="location" id="location" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" to="/home" className="mr-2">Save</Button>
              <Button color="secondary" tag={Link} to="/categories" className="mr-2">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>

        {/* <div class="hr-div">
          <hr class="hr" data-content="$" />
        </div> */}

        <Container id="exp-container" className="mt-5">
          <h2>Expense Chart</h2>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="10%">Date</th>
                <th width="25%">Description</th>
                <th width="25%">Location</th>
                <th width="25%">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e =>
                <tr key={e.id}>
                  <td> <Moment date={e.expenseDate} format="YYYY/MM/DD" /></td>
                  <td>{e.description}</td>
                  <td>{e.location}</td>
                  <td>${e.amount}</td>
                  <td><Button size="sm" color="danger" onClick={() => this.deleteExpense(e.id)}>Delete</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default Expenses;