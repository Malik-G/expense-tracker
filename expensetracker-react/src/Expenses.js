import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Container, Input, Button, Label, FormGroup, Form } from 'reactstrap';
import Moment from 'react-moment';

class Expenses extends Component {
  state = {
    date: new Date()
  }

  handleChange

  handleSubmit
  
  render() {
    const title = <h3>Add Expense</h3> 
    return (
      <>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input type="text" name="category" id="category" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="expenseDate">Date</Label>
              <DatePicker selected={this.state.date} id="expenseDate" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input type="text" name="location" id="location" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" to="/home">Save</Button>
              <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </>
    );
  }
}

export default Expenses;