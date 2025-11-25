import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DB_URL } from "../firebase";

// === CREATE BOOKING REQUEST ===
export const bookHotel = createAsyncThunk(
  "request/bookHotel",
  async (
    { hotelId, hotelName, userEmail, pincode,city,people, date, price },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        hotelId,
        hotelName,
        userEmail,
        pincode,
        city,
        peopleBooked: Number(people),
        date,
        price: Number(price),
        status: "pending",
        createdAt: Date.now(),
      };

      const res = await axios.post(`${DB_URL}/requests.json`, payload);
      const id = res.data.name;
      return { id, ...payload };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// === FETCH ALL REQUESTS ===
export const fetchRequests = createAsyncThunk(
  "request/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${DB_URL}/requests.json`);
      const data = res.data || {};
      const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      return list;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// === UPDATE REQUEST STATUS ===
export const updateRequestStatus = createAsyncThunk(
  "request/updateRequestStatus",
  async ({ requestId, newStatus }, { rejectWithValue }) => {
    try {
      const reqRes = await axios.get(`${DB_URL}/requests/${requestId}.json`);
      if (!reqRes.data) throw new Error("Request not found");

      const { hotelId, peopleBooked } = reqRes.data;

      // Update status
      await axios.patch(`${DB_URL}/requests/${requestId}.json`, {
        status: newStatus,
        updatedAt: new Date().toLocaleString(),
      });

      // Update hotel people count if approved
      if (newStatus === "approved") {
        const hotelRes = await axios.get(`${DB_URL}/hotels/${hotelId}.json`);
        const hotel = hotelRes.data || {};
        const current = Number(hotel.availablePeople ?? hotel.totalPeople ?? 0);
        const updated = Math.max(0, current - Number(peopleBooked || 0));
        await axios.patch(`${DB_URL}/hotels/${hotelId}.json`, {
          availablePeople: updated,
        });
      }

      return { requestId, newStatus };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState: { requests: [], loading: false, error: null },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookHotel.pending, (s) => {
        s.loading = true;
      })
      .addCase(bookHotel.fulfilled, (s, a) => {
        s.loading = false;
        s.requests.push(a.payload);
      })
      .addCase(bookHotel.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchRequests.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (s, a) => {
        // s.loading = false;
        // s.requests = a.payload;
        s.loading = false;

        const newData = a.payload;

        // MERGE NEW OR UPDATED REQUESTS
        newData.forEach((req) => {
          const exist = s.requests.find((r) => r.id === req.id);
          if (!exist) {
            s.requests.push(req); // Add new
          } else {
            Object.assign(exist, req); // Update existing silently
          }
        });

        // REMOVE DELETED REQUESTS
        s.requests = s.requests.filter((r) =>
          newData.some((n) => n.id === r.id)
        );
      })
      .addCase(fetchRequests.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(updateRequestStatus.fulfilled, (s, a) => {
        const idx = s.requests.findIndex((r) => r.id === a.payload.requestId);
        if (idx >= 0) s.requests[idx].status = a.payload.newStatus;
      });
  },
});

export const { setRequests } = requestSlice.actions;
export default requestSlice.reducer;
