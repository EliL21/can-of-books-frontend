import React from 'react';
import './App.css';
import axios from 'axios';
import Bestbooks from './Bestbooks';
import Carousel from 'react-bootstrap/Carousel';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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

  // REACT LIFECYCLE METHOD 

  componentDidMount(){
    this.getBooks();
  }

  
  render() {
    console.log('App State >>> ', this.state);
    return (
      <>
        <header>
          <h1>Cool books</h1>
        </header>
        <main>
          {
            this.state.books.length > 0 &&
            <>
              {this.state.books.map(book => {
                return <p key={book._id}>{book.name} is a {book.color} book</p>
              })}
            </>
          }
        </main>
      </>
    );
  }
}

export default App;