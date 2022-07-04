import { Component } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBooksAction } from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    booksInStock: state.book.stock,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => {
      dispatch(getBooksAction()) // dispatching the "special" action creator in the actions file
    },
  }
}

class BookStore extends Component {
  state = {
    // books: [], // eventually will be filled up with 6 books
    bookSelected: null, // initially is null since we haven't selected a book yet!
  }

  componentDidMount = async () => {
    // I'll still need to dispatch the getBooksAction creator from somewhere!
    this.props.getBooks()
  }

  changeBook = (book) => this.setState({ bookSelected: book })

  render() {
    return (
      <Row>
        <Col md={4}>
          <BookList
            books={this.props.booksInStock} // this is the stock array from the Redux Store
            bookSelected={this.state.bookSelected}
            changeBook={this.changeBook}
          />
        </Col>
        <Col md={8}>
          <BookDetail bookSelected={this.state.bookSelected} />
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore)
// in order to let BookStore dispatch the getBooksAction action creator
// we need to connect it to the Redux Store...!
