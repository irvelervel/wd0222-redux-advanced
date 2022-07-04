import { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux'
import { addToCartAction, addToCartActionWithThunk } from '../redux/actions'

// we don't technically need to write a mapStateToProps, since we're not interested
// in reading anything from here!
// ...but we need a mapStateToProps in order to get access to the second argument
// of connect, mapDispatchToProps (which is what we want to use in here!)
// ...so, let's write a very dumb mapStateToProps

const mapStateToProps = (state) => {
  return {
    username: state.user.name,
    booksFetchingError: state.book.error,
  }
  // let's leave it as an empty object, so we're not going to have
  // any additional and useless prop!
}

// mapDispatchToProps is a function returning an object
// every KEY you add to this object, is going to become an additional PROP for BookDetail
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (book) => {
      dispatch(addToCartActionWithThunk(book))
      // addToCartAction is an ACTION CREATOR we're importing from ../redux/actions
      // it's a function returning the action (JS OBJECT), we wrote it separately
      // to improve readibility & reusability!
    },
  }
}

class BookDetail extends Component {
  state = {
    book: null, // this will be one of the books, eventually!
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.bookSelected,
      })
    }
  }

  render() {
    return (
      <div className="mt-3">
        {this.props.booksFetchingError && (
          <Alert variant="danger">ERROR HAPPENED</Alert>
        )}
        {this.state.book ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{this.state.book.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img
                    className="book-cover"
                    src={this.state.book.imageUrl}
                    alt="book selected"
                  />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>
                  {this.state.book.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>
                  {this.state.book.price}
                </p>
                {/* this button should be shown just if the user
                IS logged in! */}
                {this.props.username ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      this.props.addToCart(this.state.book)
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <div>
                    You need to log in for adding books to the shopping cart
                  </div>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Please select a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)

// BookDetails just wants to make its Add to Cart button working!
// it's not interested in reading anything from the redux store...
// it wants though to add a book to the cart! that will involve DISPATCHING an ACTION
