import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { SearchPage, PaymentPage } from "./pages";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
// import Completion from "./components/Modal/Completion";
import { Provider } from "react-redux";
import { store } from "./redux";
import CompletionComponent from "./components/CompletionComponent";

function App() {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col items-center pt-6 h-full">
          <Link to="/" className="md:self-start px-6">
            <img
              className="h-[80px]"
              src="https://i.ibb.co/v4f4RtW/logo.png"
              alt="logo"
            ></img>
          </Link>
          <div className="flex flex-col items-center w-full p-4">
            <div className="content-title md:text-7xl sm:text-5xl text-3xl text-center">
              Pay For Parking
            </div>
            <div className="w-[100%] sm:w-[80%] md:w-[60%] mt-10">
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route
                  path="/completion"
                  element={
                    <CompletionComponent
                      stripePromise={loadStripe(
                        import.meta.env.VITE_API_STRIPE_TEST
                      )}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
