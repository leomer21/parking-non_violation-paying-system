import { useEffect, useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  PaymentElementProps,
} from "@stripe/react-stripe-js";

import { useAppDispatch, useAppSelector } from "../redux";
import { payForParking } from "../redux/slice/appReducer";

const StripeComponent = ({
  clientSecretKey,
  plateNumber,
  duration,
  amount,
}: {
  clientSecretKey: string;
  plateNumber: string;
  duration: number;
  amount: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const { lot } = useAppSelector(({ app }) => app);

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecretKey) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/completion?lot=${lot.siteCode}&plageNumber=${plateNumber}&duration=${duration}&amount=${amount}&receiptEmail=${email}`,
        receipt_email: email,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "An error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setStatus(error.type);
    } else if (paymentIntent) {
      setStatus(paymentIntent.status);
      await delay(2000);
      switch (paymentIntent.status) {
        case "succeeded":
          location.href = `${window.location.origin}/completion?lot=${
            lot.siteCode
          }&plageNumber=${plateNumber}&duration=${duration}&amount=${
            parseFloat((amount * 1.07).toFixed(2)) + 0.5
          }&receiptEmail=${email}`;
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions: PaymentElementProps["options"] = {
    layout: "tabs",
  };

  useEffect(() => {
    status === "succeeded" &&
      amount &&
      plateNumber &&
      lot._id &&
      duration &&
      dispatch(
        payForParking({
          Amount: amount,
          Code: plateNumber,
          Lot: lot._id,
          duration: duration,
        })
      );
  }, [status, amount, plateNumber, duration]);

  return (
    <form
      className="payment-form mt-4 p-6 rounded-md"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter email address"
        className="w-full p-2 border border-gray-200 rounded-md"
      />
      <PaymentElement className="mt-4" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        type="submit"
        className="w-full bg-[#fa551d] font-bold font-sans text-white rounded-md p-3 mt-4"
      >
        {isLoading ? (
          <div className="flex space-x-2 justify-center items-center dark:invert">
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          "Pay now"
        )}
      </button>
      {message}
    </form>
  );
};

export default StripeComponent;
