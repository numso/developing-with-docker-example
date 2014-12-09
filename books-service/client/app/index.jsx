var React = window.React = require('react');
var axios = require('axios');

require('zurb-foundation/css/foundation');
require('zurb-foundation/css/normalize');

var Books = React.createClass({
  getInitialState() {
    return {
      books: []
    };
  },

  componentDidMount() {
    axios.get('/books').then((resp) => {
      this.setState({
        books: resp.data
      });
    });
  },

  removeBook(i) {
    var id = this.state.books[i].id;
    axios.delete(`/books/${id}`).then(() => {
      this.state.books.splice(i, 1)
      this.setState({
        books: this.state.books
      });
    });
  },

  addBook() {
    var book = {
      title: this.refs.title.getDOMNode().value,
      author: this.refs.author.getDOMNode().value
    };
    axios.post('/books', book).then((resp) => {
      book.id = resp.data.generated_keys[0];
      this.state.books.push(book);
      this.setState({
        books: this.state.books
      });
    });

  },

  getBook(book, i) {
    var closeStyle = { display: 'inline-block', float: 'right', color: 'red', cursor: 'pointer' };
    return (
      <div>
        <div style={{ display: 'inline-block', minWidth: 170 }}>{book.title}</div>
        <div style={{ display: 'inline-block' }}> by {book.author}</div>
        <div style={closeStyle} onClick={this.removeBook.bind(this, i)}>X</div>
      </div>
    );
  },

  render() {
    return (
      <div className="row">
        <div className="column small-5 small-centered">
          <h1>Manage Books</h1>
          <div>
            {this.state.books.length ? this.state.books.map(this.getBook) : 'There are no books :(. Add one below.'}
          </div>
          <div style={{marginTop:50}}>
            <div>Title</div>
            <input ref="title" type="text"/>
            <div>Author</div>
            <input ref="author" type="text"/>
            <button onClick={this.addBook}>+ Add</button>
          </div>
        </div>
      </div>
    );
  }

});

React.render(<Books/>, document.body);
