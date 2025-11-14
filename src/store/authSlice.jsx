import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, DB_URL } from "../firebase";

// === SIGNUP ===
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, role = "user" }, { rejectWithValue }) => {
    try {
      // 1️⃣ Create user in Firebase Auth
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        { email, password, returnSecureToken: true }
      );

      const userId = res.data.localId;
      const token = res.data.idToken;

      // 2️⃣ Save user record in Realtime DB (role can be "user" or "admin")
      await axios.put(`${DB_URL}/users/${userId}.json?auth=${token}`, {
        email,
        role,
      });

      const userData = { token, email, userId, role };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || err.message);
    }
  }
);






// 🔹 Create user (Firebase Auth Signup)
// export async function signupUser(email, password) {
//   try {
//     const res = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
//       {
//         email,
//         password,
//         returnSecureToken: true,
//       }
//     );

//     return res.data; // contains idToken, email, refreshToken, localId (UID)
//   } catch (error) {
//     console.error("Signup Error:", error.response.data.error.message);
//     throw error;
//   }
// }

// // 🔹 Save user profile in RTDB (NEW STRUCTURE)
// export async function saveUserProfile(email, role) {
//   try {
//     const emailKey = email.replace(/\./g, ""); // for folder name

//     await axios.put(
//       `https://<your-database>.firebaseio.com/users/${emailKey}/profile.json`,
//       {
//         email,
//         role,
//       }
//     );

//     return true;
//   } catch (error) {
//     console.error("Saving Profile Error:", error);
//     throw error;
//   }
// }













// === LOGIN ===
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Firebase Auth Login
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        { email, password, returnSecureToken: true }
      );

      const userId = res.data.localId;
      const token = res.data.idToken;

      // 2️⃣ Fetch user role from DB
      const roleRes = await axios.get(`${DB_URL}/users/${userId}.json?auth=${token}`);
      const role = roleRes.data?.role || "user";

      const userData = { token, email, userId, role };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || err.message);
    }
  }
);

// === VERIFY TOKEN ===
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        { idToken: token }
      );
      return res.data.users[0];
    } catch (err) {
      return rejectWithValue("Invalid or expired token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (s) => { s.loading = true; })
      .addCase(signupUser.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload;
      })
      .addCase(signupUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(loginUser.pending, (s) => { s.loading = true; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false; s.user = a.payload;
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(verifyToken.fulfilled, (s, a) => { /* no change */ })
      .addCase(verifyToken.rejected, (s) => {
        s.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
