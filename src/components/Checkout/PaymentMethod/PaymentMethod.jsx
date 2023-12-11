import React, { useState } from "react";

import { MdOutlinePayment } from "react-icons/md";
import americanExpress from "../../../images/paymentMethod/americanexpress.png";
import masterCard from "../../../images/paymentMethod/mastercard.png";
import payPal from "../../../images/paymentMethod/paypal_logo.png";
import visa from "../../../images/paymentMethod/visa.png";
import Modal from 'react-modal';

import "./PaymentMethod.css";
Modal.setAppElement('#root') // This line is for accessibility purposes

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div className="payment-method-container">
      <div className="flex gap-10px margin-bottom-10px vertically-center underlined fit-content">
        <MdOutlinePayment size={30} />
        <h1 className="form-title margin-0">Payment</h1>
      </div>
      <div className="flex-column gap-10px">
        <img style={{ width: "150px" }} src={payPal} alt="PayPal Logo" />
        <label className="flex gap-10px">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={() => handleMethodChange("paypal")}
          />
          <p>PayPal</p>
        </label>
      </div>
      <div className="flex-column">
        <div className="flex wrap">
          <img className="payment-card-image" src={visa} alt="Visa Logo" />
          <img
            className="payment-card-image"
            src={masterCard}
            alt="MasterCard Logo"
          />
          <img
            className="payment-card-image"
            src={americanExpress}
            alt="American Express Logo"
          />
        </div>
        <label className="flex gap-10px">
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={
              selectedMethod === "visa" ||
              selectedMethod === "masterCard" ||
              selectedMethod === "americanExpress"
            }
            onChange={() => handleMethodChange("visa")}
          />
          <p>Credit Card</p>
        </label>
      </div>
      <Modal isOpen={showModal}>
      {selectedMethod === "paypal" && (
        <form className="paypal-form">
          <label className="paypal-label">
            Email:
            <input className="paypal-input" type="email" name="email" placeholder="Enter your email" onChange={handleFormChange} />
          </label>
          <label>
            Password:
            <input className="paypal-input" type="password" name="password" placeholder="Enter your password" onChange={handleFormChange} />
          </label>
          <label>
            <input type="checkbox" name="billingAddress" onChange={handleFormChange} />
            Deliver to billing address
          </label>
          <p>
            You acknowledge the 
            <a href="#" target="_blank" rel="noopener noreferrer"> terms </a> 
            of the service PayPal provides to the seller and agree to the 
            <a href="#" target="_blank" rel="noopener noreferrer"> Privacy Statement </a>. 
            PayPal account required.
          </p>
          <button className="payments-button" type="submit" onClick={() => setShowModal(false)}>BUY NOW</button>
        </form>
      )}
        {selectedMethod === "visa" && (
          <form className="creditcards-form">
            <label className="creditcards-label">
              Card Number:
              <input className="creditcards-input" type="text" name="cardNumber"placeholder="Enter your card number" onChange={handleFormChange} />
            </label>
            <label>
              Expiry Date:
              <input className="creditcards-input" type="text" name="expiryDate" placeholder="Enter expire date" onChange={handleFormChange} />
            </label>
            <label>
              Security Code:
              <input className="creditcards-input" type="text" name="securityCode" placeholder="Enter security code" onChange={handleFormChange} />
            </label>
            <label>
              First Name:
              <input className="creditcards-input" type="text" name="firstName" placeholder="Enter first name" onChange={handleFormChange} />
            </label>
            <label>
              Last Name:
              <input className="creditcards-input" type="text" name="lastName" placeholder="Enter last name" onChange={handleFormChange} />
            </label>
            <label>
              Address Line:
              <input className="creditcards-input" type="text" name="addressLine" placeholder="Enter address line" onChange={handleFormChange} />
            </label>
            <label>
              Town/City:
              <input className="creditcards-input" type="text" name="townCity" placeholder="Enter town or city" onChange={handleFormChange} />
            </label>
            <label>
              Country:
              <select className="creditcards-input" name="country" onChange={handleFormChange}>
                {["Fimland", "Sweden", "Norway", "Estonia", "Germany", "Canada", "United States"].map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </label>
            <label>
              Phone Number:
              <input className="creditcards-input" type="text" name="phoneNumber" placeholder="Enter phone number" onChange={handleFormChange} />
            </label>
            <label>
              Email:
              <input className="creditcards-input" type="email" name="email" placeholder="Enter email" onChange={handleFormChange} />
            </label>
            <label>
              <input type="checkbox" name="billingAddress" onChange={handleFormChange} />
              Deliver to billing address
            </label>
            <p>
              You acknowledge the 
              <a href="#" target="_blank" rel="noopener noreferrer"> terms </a> 
              of the service Credit Card provides to the seller and agree to the 
              <a href="#" target="_blank" rel="noopener noreferrer"> Privacy Statement </a>.
            </p>
            <button className="payments-button" type="submit" onClick={() => setShowModal(false)}>BUY NOW</button>
          </form>
        )}
        <button className="payments-button" onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default PaymentMethod;
