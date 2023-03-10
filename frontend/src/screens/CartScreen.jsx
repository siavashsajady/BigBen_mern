import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Image,
  Card,
  ListGroup,
  Button,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  const productId = params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // const [searchParams] = useSearchParams();
  // const qty = searchParams.get('qty');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h2>Cart</h2>
    </div>
  );
};

export default CartScreen;
