import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeFromCartAction } from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    cart: state.cart.content,
    // cart is now a prop holding the cart array coming from the redux store
  }
}

const mapDispatchToProps = (dispatch) => ({
  // shorthand way for a function returning an object: () => ({})
  removeFromCart: (indexToRemove) => {
    dispatch(removeFromCartAction(indexToRemove))
  },
})

// the cart prop initially is undefined, since we're not passing any prop from App.js!
// since cart is undefined, we're assigning to it a default value with the = operator
// the default value we're assigning to it is []
const Cart = ({ cart, removeFromCart }) => (
  <Row>
    <Col sm={12}>
      <ul style={{ listStyle: 'none' }}>
        {cart.map((book, i) => (
          <li key={i} className="my-4">
            <Button variant="danger" onClick={() => removeFromCart(i)}>
              <FaTrash />
            </Button>
            <img
              className="book-cover-small"
              src={book.imageUrl}
              alt="book selected"
            />
            {book.title}
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className="font-weight-bold">
        TOTAL:{' '}
        {cart.reduce(
          (acc, currentValue) => acc + parseFloat(currentValue.price),
          0
        )}
      </Col>
    </Row>
  </Row>
)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
