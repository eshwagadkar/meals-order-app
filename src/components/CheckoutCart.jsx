import { useContext } from 'react'
import CartContext from '../store/CartContext'
import Modal from './UI/Modal'
import { currencyFormatter } from '../util/formatting'
import UserProgressContext from '../store/UserProgressContext'
import Input from './UI/Input'
import Button from './UI/Button'
import useHttp from '../hooks/useHttp'
import Error from './Error'

const requestConfig = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' }
}

export default function CheckoutCart() {
    
    const { items, clearCart } = useContext(CartContext)
    const { hideCheckout, progress } = useContext(UserProgressContext)
    
    const { data, isLoading, error, sendRequest, clearStates } = useHttp(
        'http://localhost:3000/orders',
         requestConfig)

    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0)

    function handleClose() { 
        hideCheckout()
        clearStates()
    }

    function handleFinish() { 
        hideCheckout()
        clearCart()
        clearStates()
     }

    async function handleSubmit(event) {
        event.preventDefault()

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries()) // Convert the form data into js object

        sendRequest(JSON.stringify({order : { items, customer: customerData }}))



    }

    let actions = ( <>
      <Button type='button' onClick={hideCheckout} textOnly>Close</Button>
      <Button>Submit Order</Button>
    </>)

    if(isLoading) {
        actions = <span>Sending order data...</span>
    }

    if(data && !error) {
        return <Modal open={progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submittted successfully!</p>
            <p>Check your inbox for more details on the order placed.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
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

            {error && <Error title='Failed to submit order' message={error} /> }

            <p className='modal-actions'>
                {actions}               
            </p>
        </form>
    </Modal>
}