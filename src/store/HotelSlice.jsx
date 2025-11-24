import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DB_URL } from "../firebase";



export const addHotel = createAsyncThunk(
  "hotel/addHotel",
  async (hotelData, { rejectWithValue }) => {
    try {
      const hotelName = hotelData.name.replace(/\s+/g, "-");
      const payload = {
        name: hotelData.name,
        img: hotelData.img,
        description: hotelData.description,
        totalPeople: Number(hotelData.totalPeople || 0),
        availablePeople: Number(hotelData.totalPeople || 0),
        price: Number(hotelData.price || 0),
        addedAt: Date.now(),
      };
      const res = await axios.put(
        `${DB_URL}/hotels/${hotelName}.json`,
        payload
      );
      return { id: hotelName, ...payload };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// fetch all hotels
export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${DB_URL}/hotels.json`);
      const data = res.data || {};
      const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      return list;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const startHotelsListener = (dispatch) => {
  const interval = setInterval(() => {
    dispatch(fetchHotels());
  }, 3000);
  return () => clearInterval(interval);
};


// update hotel (admin edit)
export const updateHotel = createAsyncThunk(
  "hotel/updateHotel",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      await axios.patch(`${DB_URL}/hotels/${id}.json`, updates);
      return { id, updates };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Hotel
export const deleteHotel = createAsyncThunk(
  "hotel/deleteHotel",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${DB_URL}/hotels/${id}.json`).unwrap();
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: "hotel",
  initialState: { hotels: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHotel.pending, (s) => {
        s.loading = true;
      })
      .addCase(addHotel.fulfilled, (s, a) => {
        s.loading = false;
        s.hotels.push(a.payload);
      })
      .addCase(addHotel.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchHotels.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchHotels.fulfilled, (s, a) => {
        s.loading = false;
        s.hotels = a.payload;
      })
      .addCase(fetchHotels.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(updateHotel.fulfilled, (s, a) => {
        const idx = s.hotels.findIndex((h) => h.id === a.payload.id);
        if (idx >= 0) {
          s.hotels[idx] = { ...s.hotels[idx], ...a.payload.updates };
        }
      })

      .addCase(deleteHotel.fulfilled, (s, a) => {
        s.hotels = s.hotels.filter((h) => h.id !== a.payload);
      })
      .addCase(deleteHotel.rejected, (s, a) => {
        s.error = a.payload || a.error?.message;
      });
  },
});

export default slice.reducer;
