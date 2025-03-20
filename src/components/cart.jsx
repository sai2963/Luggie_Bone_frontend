import { useSelector, useDispatch } from "react-redux";
import { removeCart, clearCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total Items: {totalQuantity}</p>
      <p>Total Price: ${totalAmount.toFixed(2)}</p>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.variantId}>
              <Link to={`/${item.productId}`}>
              {item.productTitle} - {item.variantTitle} - {item.quantity} x $
              </Link>
              {Number(item.price).toFixed(2)}  {/* ✅ Fix: Ensure price is a number */}
              <button onClick={() => dispatch(removeCart(item.variantId))}>Remove</button>
            </li>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;
