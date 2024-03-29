import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

const App = () => {
   return (
      <BrowserRouter>
         <Header />
         <main className='py-3'>
            <Container>
               <Routes>
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route path='/order/:id' element={<OrderScreen />} />
                  <Route path='/shipping' element={<ShippingScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                  <Route path='/product/:id' element={<ProductScreen />} />
                  <Route path='/cart/:id?' element={<CartScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route
                     path='/admin/user/:id/edit'
                     element={<UserEditScreen />}
                  />

                  <Route path='/' element={<HomeScreen />} exact />
               </Routes>
            </Container>
         </main>
         <Footer />
      </BrowserRouter>
   );
};

export default App;
