import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DB_URL } from "../firebase";

// === CREATE BOOKING REQUEST ===
export const bookHotel = createAsyncThunk(
  "request/bookHotel",
  async ({ hotelId, hotelName, userEmail, people }, { rejectWithValue }) => {
    try {
      const payload = {
        hotelId,
        hotelName, // ✅ Added hotel name
        userEmail,
        peopleBooked: Number(people),
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
        updatedAt: Date.now(),
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
      .addCase(bookHotel.pending, (s) => { s.loading = true; })
      .addCase(bookHotel.fulfilled, (s, a) => {
        s.loading = false;
        s.requests.push(a.payload);
      })
      .addCase(bookHotel.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchRequests.pending, (s) => { s.loading = true; })
      .addCase(fetchRequests.fulfilled, (s, a) => {
        s.loading = false;
        s.requests = a.payload;
      })
      .addCase(fetchRequests.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(updateRequestStatus.fulfilled, (s, a) => {
        const idx = s.requests.findIndex((r) => r.id === a.payload.requestId);
        if (idx >= 0) s.requests[idx].status = a.payload.newStatus;
      });
  },
});

export const { setRequests } = requestSlice.actions;
export default requestSlice.reducer;



// // src/store/RequestSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { DB_URL } from "../firebase";

// // create booking request (user)
// export const bookHotel = createAsyncThunk(
//   "request/bookHotel",
//   async ({ hotelId, userEmail, people }, { rejectWithValue }) => {
//     try {
//       const payload = {
//         hotelId,
//         userEmail,
//         peopleBooked: Number(people),
//         status: "pending",
//         createdAt: Date.now(),
//       };
//       const res = await axios.post(`${DB_URL}/requests.json`, payload);
//       const id = res.data.name;
//       return { id, ...payload };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // fetch all requests (admin)
// export const fetchRequests = createAsyncThunk(
//   "request/fetchRequests",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${DB_URL}/requests.json`);
//       const data = res.data || {};
//       const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
//       return list;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // update request status (approve or reject). If approved, decrement hotel's availablePeople.
// export const updateRequestStatus = createAsyncThunk(
//   "request/updateRequestStatus",
//   async ({ requestId, newStatus }, { rejectWithValue }) => {
//     try {
//       // 1) get request
//       const reqRes = await axios.get(`${DB_URL}/requests/${requestId}.json`);
//       if (!reqRes.data) throw new Error("Request not found");
//       const { hotelId, peopleBooked } = reqRes.data;

//       // 2) update request status
//       await axios.patch(`${DB_URL}/requests/${requestId}.json`, { status: newStatus, updatedAt: Date.now() });

//       // 3) if approved => update hotel's availablePeople
//       if (newStatus === "approved") {
//         const hotelRes = await axios.get(`${DB_URL}/hotels/${hotelId}.json`);
//         const hotel = hotelRes.data || {};
//         const current = Number(hotel.availablePeople ?? hotel.totalPeople ?? 0);
//         const updated = Math.max(0, current - Number(peopleBooked || 0));
//         await axios.patch(`${DB_URL}/hotels/${hotelId}.json`, { availablePeople: updated });
//       }

//       return { requestId, newStatus };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const slice = createSlice({
//   name: "request",
//   initialState: { requests: [], loading: false, error: null },
//   reducers: {
//     setRequests: (state, action) => {
//       state.requests = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(bookHotel.pending, (s) => { s.loading = true; })
//       .addCase(bookHotel.fulfilled, (s, a) => { s.loading = false; s.requests.push(a.payload); })
//       .addCase(bookHotel.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

//       .addCase(fetchRequests.pending, (s) => { s.loading = true; })
//       .addCase(fetchRequests.fulfilled, (s, a) => { s.loading = false; s.requests = a.payload; })
//       .addCase(fetchRequests.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

//       .addCase(updateRequestStatus.fulfilled, (s, a) => {
//         const idx = s.requests.findIndex(r => r.id === a.payload.requestId);
//         if (idx >= 0) s.requests[idx].status = a.payload.newStatus;
//       });
//   },
// });

// export const { setRequests } = slice.actions;
// export default slice.reducer;






