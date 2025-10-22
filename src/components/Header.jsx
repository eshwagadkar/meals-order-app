import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header() {

    const { items } = useContext(CartContext)
    const { showCart } = useContext(UserProgressContext)

    const totalCartItems = items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    function handleShowCart () { showCart() }

    return <header id='main-header'>
        <div id='title'>
            <img src={logoImg} alt='header-logo'/>
            <h1>ReactMeals</h1>
        </div>
        <nav>
            <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}