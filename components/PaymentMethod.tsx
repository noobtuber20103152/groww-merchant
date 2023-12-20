/* eslint-disable @next/next/no-img-element */
import { selectMethod, setPage } from "@/store/slice";
import { Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
function PaymentMethod() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const paymentMethods = useSelector(
    (state: any) => state.order.paymentMethods
  );
  const selectedMethod = useSelector(
    (state: any) => state.order.selectedMethod
  );
  const makePayment = () => {
    if (selectedMethod < 1 || selectedMethod > paymentMethods.length) {
      toast.error("Please choose payment method...");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(setPage("3"));
      setLoading(false);
      router.push("/confirm");
    }, 2000);
  };
  return (
    <>
      <div className=" rounded-lg lg:mt-0 mt-6 px-4 pt-8">
        {paymentMethods?.map((method: any, index: any) => {
          if (method == "UPI") {
            return (
              <>
                <div className="my-3">
                  <button
                    onClick={() => {
                      dispatch(selectMethod(index + 1));
                    }}
                    className={`flex ${
                      selectedMethod === index + 1 ? "bg-gray-100" : ""
                    }  w-full justify-between border rounded-lg px-4 py-2`}
                  >
                    <div className="flex">
                      <img
                        className="h-24 w-24 object-contain"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png"
                        alt=""
                      />
                      <div className="ml-4 flex flex-col items-start justify-center">
                        <h1 className="text-gray-600">Cash on Delivery</h1>
                      </div>
                    </div>
                    <div></div>
                  </button>
                </div>
              </>
            );
          } else if (method == "CARDS") {
            return (
              <>
                <div className="my-3">
                  <button
                    onClick={() => {
                      dispatch(selectMethod(index + 1));
                    }}
                    className={`flex ${
                      selectedMethod === index + 1 ? "bg-gray-100" : ""
                    }   w-full justify-between border rounded-lg px-4 py-2`}
                  >
                    <div className="flex">
                      <img
                        className="h-24 w-24 object-contain"
                        src="https://static.vecteezy.com/system/resources/previews/008/490/560/original/credit-card-transparent-background-png.png"
                        alt=""
                      />
                      <div className="ml-4 flex flex-col items-start justify-center">
                        <h1 className="text-gray-600">Cash on Delivery</h1>
                        <p className="text-gray-600">1234******102</p>
                      </div>
                    </div>
                    <div></div>
                  </button>
                </div>
              </>
            );
          }
        })}
        {loading ? (
          <div className="flex justify-center items-center py-3 bg-black rounded-md">
            <Spinner />
          </div>
        ) : (
          <button
            onClick={makePayment}
            className=" w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Make Payment
          </button>
        )}
      </div>
    </>
  );
}

export default PaymentMethod;
