import { Button, Image, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../actions/orderAction';
import { useEffect } from 'react';

const PlaceOrderScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const cart = useSelector((state) => state.cart);

   //Calculate Prices

   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };

   cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   );

   cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100);
   cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));
   cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
   ).toFixed(2);

   const orderCreate = useSelector((state) => state.orderCreate);
   const { order, success, error } = orderCreate;

   useEffect(() => {
      if (success) {
         navigate(`/order/${order._id}`);
      }
   }, [success]);

   const placeOrderHandler = () => {
      dispatch(
         createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
         })
      );
   };

   return (
      <>
         <CheckoutSteps step1 step2 step3 step4>
            {' '}
         </CheckoutSteps>

         <Row>
            <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2>Shipping</h2>
                     <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address},{' '}
                        {cart.shippingAddress.city},{' '}
                        {cart.shippingAddress.postalCode},{' '}
                        {cart.shippingAddress.country}
                     </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2>Payemnt Method</h2>
                     <strong>Method: </strong>
                     {cart.paymentMethod}
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2>Order Items</h2>

                     {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                     ) : (
                        <ListGroup variant='flush'>
                           {cart.cartItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={1}>
                                       <Image
                                          src={item.image}
                                          alt={item.name}
                                          fluid
                                          rounded
                                       />
                                    </Col>
                                    <Col>
                                       <Link to={`/product/${item.product}`}>
                                          {item.name}
                                       </Link>
                                    </Col>
                                    <Col md={4}>
                                       {item.qty} x {'\u20B9'}
                                       {item.price} = {'\u20B9'}
                                       {item.qty * item.price}
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     )}
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>
                              {'\u20B9'}
                              {cart.itemsPrice}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>
                              {'\u20B9'}
                              {cart.shippingPrice}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>
                              {'\u20B9'}
                              {cart.taxPrice}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>
                              {'\u20B9'}
                              {cart.totalPrice}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button
                           type='button'
                           className='btn-block'
                           disabled={cart.cartItems === 0}
                           onClick={placeOrderHandler}
                        >
                           Place Order
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default PlaceOrderScreen;
