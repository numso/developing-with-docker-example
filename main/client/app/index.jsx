var React = window.React = require('react');
var axios = require('axios');

var Test = React.createClass({

  getInitialState() {
    return {
      books: []
    };
  },

  componentDidMount() {
    axios.get('/books').then((resp) => {
      this.setState({
        books: resp.data
      })
    });
  },

  render() {
    return (
      <div>
        <h1>Well Hello There!</h1>
        <p>My name is Bubba Jones and here are the books that I like:</p>
        <ul>
          {this.state.books.map((book)=>(<li>{book.title} by {book.author}</li>))}
        </ul>
        <p>If you'd like to change this list, just head on over to dockerhost:4000</p>
      </div>
    );
  }

});

React.render(<Test/>, document.body);
