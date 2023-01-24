import React from 'react';
import './App.css';
import axios from 'axios';
import Bestbooks from './Bestbooks';
import Header from './Header';
import About from './About';
import Footer from './Footer';
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { title } from 'process';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    }
  }

  getBooks = async () => {
    try {
      // TODO: use axios to call out to my server get all the booksfrom the DB
      let url = `${process.env.REACT_APP_SERVER}/books`

      let bookData = await axios.get(url);

      this.setState({
        books: bookData.data
      });

    } catch (error) {
      console.log(error.response)
    }
  }
  // **** Handle Delete Request *********
  deleteBooks = async(id) => {
    let url = `${process.env.REACT_APP_SERVER}/books/${id}`

    await axios.delete(url);
    let filterBooks = this.state.books.filter(book => book._id !== id)
    this.setState ({
      books: filterBooks
    })
  }
  // REACT LIFECYCLE METHOD 

  componentDidMount() {
    this.getBooks();
  }
// HandleOpenModal that change setState  to true
handleOpenModal = () => {
  this.setState({
    showmodal: true,
    title: title, 
  })
}
// Handler to close the modal
// Handler to grab form data and make my post request


  render() {
    console.log('App State >>> ', this.state);
    return (
      <>
      <Router>
          <Header />
          <Routes>
            <Route
              exact path='/'
              element={
              <>
              <Button>Add a Book</Button>
              <Bookformmodal />
              <Bestbooks books={this.state.books} deleteBooks={this.deleteBooks} />
              </>
              }

            >
            </Route>
            <Route
              exact path='/about'
              element={<About />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of ‘/about’ that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      
      </>
    );
  }
}

export default App;