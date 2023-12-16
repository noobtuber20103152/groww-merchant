/* eslint-disable @next/next/no-img-element */
import { indian_states } from "@/lib/state";
import {
  addCoupanCode,
  addEmail,
  addPinCode,
  addState,
  addStreetAddress,
  applyCoupanCode,
  setPage,
} from "@/store/slice";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import toast from "react-hot-toast";
import checkDetails from "@/lib/checkOrderDetails";
import { coupan } from "@/lib/coupan";
import { useRouter } from "next/navigation";
import generateRandomId from "@/lib/randomId";
function PaymentDetails() {
  const [loading, setLoading] = useState(false);
  const [indianState, setIndianState] = useState(indian_states);
  const router = useRouter();
  const dispatch = useDispatch();
  const orderDetails = useSelector(
    (state: RootState) => state.order.orderDetails
  );
  const placeOrder = () => {
    if (!checkDetails(orderDetails)) {
      toast.error("Please enter valid info...");
      return;
    }
    dispatch(setPage(2));
    router.refresh();
    router.replace(`/order?id=${generateRandomId(8)}`);
  };

  const applyCoupan = () => {
    if (!checkDetails(orderDetails)) {
      toast.error("Please enter valid info...");
      return;
    }
    if (orderDetails.coupanCode.length == 0) {
      toast.error("Please enter valid coupan code...");
      return;
    }
    let filterCoupan: any = coupan.find(
      (data: any) => data.coupanCode === orderDetails.coupanCode
    );
    if (!filterCoupan) {
      toast.error("Please enter valid coupan code...");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log("timeout");
      dispatch(applyCoupanCode(filterCoupan.discount));
      setLoading(false);
      toast.success("Coupan code applied successfully !!!");
    }, 2000);
  };
  return (
    <>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Delivery Details</p>
        <p className="text-gray-400">
          Complete your order by providing your delivery details.
        </p>
        <div className="">
          <label
            htmlFor="email"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <div className="relative">
            <input
              onChange={(e: any) => {
                dispatch(addEmail(e.target.value));
              }}
              id="email"
              name="email"
              value={orderDetails.email}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>

          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Address
          </label>
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <input
                onChange={(e: any) => {
                  dispatch(addStreetAddress(e.target.value));
                }}
                id="billing-address"
                value={orderDetails.streetAddress}
                name="billing-address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street Address"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img
                  className="h-4 w-4 object-contain"
                  src="https://www.svgrepo.com/show/405510/flag-for-flag-india.svg"
                  alt=""
                />
              </div>
            </div>
            <select
              name="billing-state"
              value={orderDetails.state}
              onChange={(e: any) => {
                dispatch(addState(e.target.value));
              }}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="default">Select state</option>
              {indianState?.map((state: any) => {
                return (
                  <>
                    <option value={state}>{state}</option>
                  </>
                );
              })}
            </select>
            <input
              name="billing-zip"
              onChange={(e: any) => {
                dispatch(addPinCode(e.target.value));
              }}
              value={orderDetails.pinCode}
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="ZIP"
            />
          </div>
          <label
            htmlFor="email"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Apply Coupan Code
          </label>
          <div className="relative">
            <input
              onChange={(e: any) => {
                dispatch(addCoupanCode(e.target.value));
              }}
              disabled={orderDetails.isAppliedCoupanCode}
              id="email"
              name="text"
              value={orderDetails.coupanCode}
              className={`w-full rounded-md border ${
                orderDetails.isAppliedCoupanCode
                  ? "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-200 focus:bg-green-400"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }  px-4 py-3 pl-11 text-sm shadow-sm  outline-none focus:z-10 `}
              placeholder="C#45"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 grid-cols-1 py-4">
          <button
            onClick={placeOrder}
            className=" w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
          {orderDetails.isAppliedCoupanCode ? (
            <button
              disabled
              className=" w-full rounded-md bg-green-500 px-6 py-3 font-medium text-white flex justify-center items-center"
            >
              Coupan Applied
              <svg
                className="ml-2 w-6 h-6 me-2 text-black-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={applyCoupan}
              className=" w-full rounded-md bg-blue-900 px-6 py-3 font-medium text-white flex items-center justify-center"
            >
              {loading ? <Loading /> : "Apply Coupan Code"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;
