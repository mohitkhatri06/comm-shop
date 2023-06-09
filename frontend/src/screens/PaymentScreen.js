import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod, saveShippingAddress } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const cart = useSelector((state) => state.cart);
   const { shippingAddress } = cart;

   if (!shippingAddress) {
      navigate('/shpping');
   }

   const [paymentMethod, setPaymentMethod] = useState('Paypal');

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate('/placeorder');
   };

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <h1>Payment Method</h1>

         <Form onSubmit={submitHandler}>
            <Form.Group>
               <Form.Label as='legend'>Select Method</Form.Label>

               <Col>
                  <Form.Check
                     type='radio'
                     label='Paypal or Credit Card'
                     id='PayPal'
                     name='paymentMethod'
                     value='PayPal'
                     checked
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  {/* <Form.Check
                     type='radio'
                     label='Stripe'
                     id='Stripe'
                     name='paymentMethod'
                     value='Stripe'
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check> */}
               </Col>
            </Form.Group>
            <Button className='mt-3' type='submit' variant='primary'>
               Continue
            </Button>
         </Form>
      </FormContainer>
   );
};

export default PaymentScreen;
