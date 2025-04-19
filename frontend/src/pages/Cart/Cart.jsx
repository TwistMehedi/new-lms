import React, { useState } from "react";
import {Link} from "react-router";

export default function Cart(){
  const [cart, setCart] = useState([
    { id: 1, name: "Basic Tee", color: "Sienna", size: "Large", price: 32, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Basic Tee", color: "Black", size: "Large", price: 32, quantity: 1, image: "https://via.placeholder.com/100" },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Number(quantity) } : item));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="flex flex-col md:flex-row justify-between p-6 bg-gray-100 min-h-screen">
      <div className="w-full md:w-2/3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.color} | {item.size}</p>
              <p className="font-bold">${item.price.toFixed(2)}</p>
            </div>
            <select
              className="select select-bordered"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            >
              {[1, 2, 3, 4, 5].map(qty => (
                <option key={qty} value={qty}>{qty}</option>
              ))}
            </select>
            <button onClick={() => handleRemove(item.id)} className="btn btn-error ml-4">X</button>
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/3 bg-white p-6 shadow-md rounded-lg mt-6 md:mt-0">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between py-2 border-b">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Shipping estimate</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Tax estimate</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg py-4">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
         <Link to="/checkout">
         <button className="btn btn-primary w-full mt-4">Checkout</button>
         </Link>
      </div>
    </div>
  );
};
