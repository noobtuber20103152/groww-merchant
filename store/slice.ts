import { orderAPI } from "@/apis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  () => {
    return axios.get(orderAPI).then((res) => res.data);
  }
);
function totalAmount(data: any) {
  let total = 0;
  for (let i of data) {
    console.log(i.quantity, i.price);
    total += i.quantity * i.price;
  }
  return Number(total.toFixed(2));
}
export interface OrderState {
  value: any;
  orderDetails: any;
  productData: any;
  loadingData: any;
  loadingError: any;
  totalAmount: any;
  deliveryFee: any;
  discount: any;
  page: any;
  paymentMethods: any;
  selectedMethod: any;
}

const initialState: OrderState = {
  value: 1,
  orderDetails: {
    email: "",
    streetAddress: "",
    state: "",
    pinCode: "",
    isAppliedCoupanCode: false,
    coupanCode: "",
  },
  productData: [],
  loadingData: true,
  loadingError: "",
  totalAmount: 0,
  deliveryFee: 10,
  discount: 0,
  page: 1,
  paymentMethods: [],
  selectedMethod: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetails.pending, (state) => {
      state.loadingData = true;
    });
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
      state.loadingData = false;
      state.productData = action.payload;
      state.paymentMethods = action.payload.paymentMethods;
      state.totalAmount = totalAmount(state.productData.products);
      state.loadingError = "";
    });
    builder.addCase(fetchOrderDetails.rejected, (state, action) => {
      state.loadingData = false;
      state.productData = [];
      state.loadingError = action.error.message;
    });
  },
  reducers: {
    setData: (state: any, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setProductData: (state: any, action) => {
      state.productData = action.payload;
    },
    addEmail: (state: any, action: any) => {
      state.orderDetails.email = action.payload;
    },
    addStreetAddress: (state: any, action) => {
      state.orderDetails.streetAddress = action.payload;
    },
    addState: (state: any, action) => {
      state.orderDetails.state = action.payload;
    },
    addPinCode: (state: any, action) => {
      state.orderDetails.pinCode = action.payload;
    },
    applyCoupanCode: (state: any, action) => {
      let totalAmount = state.totalAmount;
      let discountAmount = (action.payload / 100) * totalAmount;
      discountAmount = Number(discountAmount.toFixed(2));
      state.discount = discountAmount;
      state.orderDetails.isAppliedCoupanCode = true;
    },
    addCoupanCode: (state: any, action) => {
      state.orderDetails.coupanCode = action.payload;
    },
    setLoadingData: (state: any, action) => {
      state.loadingData = action.payload;
    },
    setPage: (state: any, action) => {
      state.page = action.payload;
    },
    selectMethod: (state: any, action) => {
      state.selectedMethod = action.payload;
    },
  },
});

export const {
  setData,
  addEmail,
  addStreetAddress,
  addState,
  addPinCode,
  applyCoupanCode,
  addCoupanCode,
  setProductData,
  setLoadingData,
  setPage,
  selectMethod,
} = orderSlice.actions;
export default orderSlice.reducer;
