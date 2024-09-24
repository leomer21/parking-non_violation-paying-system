import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppStateType, LotType } from "../../types";
import { defaultLotData } from "../../config";
import { request } from "../../utils";

export const fetchLots = createAsyncThunk<LotType[], void>("lots", async () => {
  try {
    const { data } = await request({ method: "GET", url: "/lot" });
    return data;
  } catch (error) {
    return []; // Return an empty array in case of an error
  }
});

interface GetClientSecretRes {
  clientSecret: string;
}

export const getClientSecret = createAsyncThunk<GetClientSecretRes, number>(
  "clientSecret",
  async (amount) => {
    try {
      const { data } = await request({
        method: "POST",
        url: "/create-payment-intent",
        data: { amount },
      });
      return data;
    } catch (error) {
      return { clientSecret: "" }; // Return an object with an empty clientSecret in case of an error
    }
  }
);

interface PayForParkingRes {
  success: boolean;
}

interface PayForParkingParams {
  Amount: number;
  Code: string;
  Lot: string;
  duration: number;
}

export const payForParking = createAsyncThunk<
  PayForParkingRes,
  PayForParkingParams
>("payforparking", async ({ Amount, Code, Lot, duration }) => {
  try {
    const { data } = await request({
      method: "POST",
      url: "/pay-for-parking",
      data: { Amount, Code, Lot, duration },
    });
    return data;
  } catch (error) {
    return { success: false }; // Return an object with an empty clientSecret in case of an error
  }
});

const initialState: AppStateType = {
  lots: [],
  lot: defaultLotData,
  clientSecret: "",
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLot: (state, action: PayloadAction<LotType>) => {
      state.lot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLots.fulfilled, (state, action) => {
      state.lots = action.payload;
    });
    builder.addCase(fetchLots.rejected, (state, action) => {
      state.lots = [];
      console.error("Failed to fetch lots:", action.error);
    });
    builder.addCase(getClientSecret.fulfilled, (state, action) => {
      state.clientSecret = action.payload.clientSecret;
    });
    builder.addCase(getClientSecret.rejected, (state, action) => {
      state.clientSecret = "";
      console.error("Failed to fetch client secret:", action.error);
    });
  },
});

export const { setLot } = appReducer.actions;

export default appReducer.reducer;
