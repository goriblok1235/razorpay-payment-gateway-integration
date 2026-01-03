import React from 'react';
import '../styles/Products.css';
import axios from 'axios';

function Products({products}) {
    const checkoutHandler = async (amount) => {
        const {data:keyData} = await axios.get("/api/v1/getkey");
        const {key} = keyData;
        console.log(key)
        const {data:orderData} = await axios.post("/api/v1/payment/process", {
            amount
        })
        const {order} = orderData;
        console.log(order);


         // Open Razorpay Checkout
      const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'Saikat Pradhan',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: '/api/v1/paymentVerification', // Your success URL
        prefill: {
          name: 'Saikat Khan Pradhan',
          email: 'saikatpradhan296@gmail.com',
          contact: '9348112717'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  return (
    <div className="products-container">
        {products.map((item) =>(
            <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.title} className='product-image' />
            <h3 className="product-title">{item.title}</h3>
            <p className="product-price">Price <strong>{item.price}</strong>/-</p>
            <button className='pay-button' onClick={()=>checkoutHandler(item.price)}>Pay({item.price})/-</button>
        </div>
        ))}
    </div>
  )
}

export default Products