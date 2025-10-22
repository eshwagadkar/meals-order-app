import Cart from './components/Cart';
import CheckoutCart from './components/CheckoutCart';
import Header from './components/Header'
import Meals from './components/Meals'
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckoutCart />
      </UserProgressContextProvider>
    </CartContextProvider>
  )
}

export default App
