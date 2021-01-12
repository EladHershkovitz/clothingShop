import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const OnToken = token => {
    console.log(token);
    alert("Payment Success");
  };
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51I8IPzGzkNpRKC3KH2cDQLbCPVVcahW5vlXZY7UJd5L8Bf5x3McAHbVv5nXIzOMv3w657knlYE7mTUdZMAScyAHb00TaQUiw6A";
  return <StripeCheckout token={OnToken} label="Pay Now" name="Clothing Ltd." billingAddress shippingAddress image="https://svgshare.com/i/Cuz.svg" description={`You total is $${price}`} amount={priceForStripe} stripeKey={publishableKey} panelLabel="Pay Now" />;
};
export default StripeCheckoutButton;
