/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";

function OrderSummary() {
  const orderData = useSelector((state: any) => state.order.productData);
  const loading = useSelector((state: any) => state.order.loadingData);
  const totalAmount = useSelector((state: any) => state.order.totalAmount);
  const discount = useSelector((state: any) => state.order.discount);
  const deliveryFee = useSelector((state: any) => state.order.deliveryFee);
  console.log(loading);
  return (
    <>
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {loading ? (
            <Skeleton />
          ) : (
            orderData?.products?.map((data: any) => {
              return (
                <>
                  <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                      className=" h-20 w-20 rounded-md object-contain "
                      src={data?.image}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{data?.title}</span>
                      <span className="float-right text-gray-400">
                        Quantity : {data?.quantity}
                      </span>
                      <p className="text-lg font-medium">${data?.price}</p>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
        <div className="mt-6 border px-3 py-2 rounded-lg borderpy-2">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Order Amount</p>
            <p className="font-semibold text-gray-900">{totalAmount}$</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Delivery Fee</p>
            <p className="font-semibold text-gray-900">{deliveryFee}$ </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Discount</p>
            <p className="font-semibold text-red-600">-{discount}$</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${(totalAmount + deliveryFee - discount).toFixed(2)}
            </p>
          </div>
        </div>

        {/* <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form> */}
      </div>
    </>
  );
}

export default OrderSummary;
