import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { loading, error, userInfo } = userLogin;

   const location = useLocation();
   const redirect = location.search ? location.search.split('=')[1] : '/';

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [navigate, userInfo, redirect]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
   };

   return (
      <FormContainer>
         <h1>Sign In</h1>
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>
               Sign In
            </Button>
         </Form>

         <Row className='py-3'>
            <Col>
               New Customer?{' '}
               <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
               >
                  Register
               </Link>
            </Col>
         </Row>
      </FormContainer>
   );
};

export default LoginScreen;
