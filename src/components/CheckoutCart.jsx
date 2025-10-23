import { useContext } from 'react'
import CartContext from '../store/CartContext'
import Modal from './UI/Modal'
import { currencyFormatter } from '../util/formatting'
import UserProgressContext from '../store/UserProgressContext'
import Input from './UI/Input'
import Button from './UI/Button'
import useHttp from '../hooks/useHttp'

export default function CheckoutCart() {
    
    const { items } = useContext(CartContext)
    const { hideCheckout, hideCart, progress } = useContext(UserProgressContext)
    const { sendRequest } = useHttp()
    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0)

    function handleClose() { hideCart() }

    async function handleSubmit(event) {
        event.preventDefault()

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries()) // Convert the form data into js object

        const response = await sendRequest('http://localhost:3000/orders', {
            method: 'POST',
            body: JSON.stringify({order : { items, customer: customerData }}),
            headers: {
                'Content-Type' : 'application/json',
            }
        })

        


    }

    return <Modal open={progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label='Full Name' type='text' id='name' />
            <Input label='Email Address' type='email' id='email' />
            <Input label='Street' type='text' id='street' />
            <div className="control-row">
                <Input label='Postal Code' type='text' id='postal-code' />
                <Input label='City' type='text' id='city' />
            </div>

            <p className='modal-actions'>
                <Button type='button' onClick={hideCheckout} textOnly>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}