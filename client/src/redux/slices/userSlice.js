import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  auth,
  logout,
  setPath,
  getMovies,
} from "../../api/user";
import { toast } from "react-toastify";
const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    folder: "",
    files: [],
    metadataList: [],
    isLoading: false,
  },
  reducers: {
    // setEmail: (state, action) => {
    //   state.email = action.payload;
    // },
    // setFolder: (state, action) => {
    //   state.folder = action.payload;
    // },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
      toast.success(`Registration successfull`);
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
      state.folder = action.payload.directory;
      state.files = action.payload.files;
      toast.success(`Login Succesfull`);
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [auth.pending]: (state) => {
      state.isLoading = true;
    },
    [auth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
      state.folder = action.payload.directory;
      state.files = action.payload.files;
    },
    [auth.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.email = "";
      state.folder = "";
      state.files = [];
      toast.success(`Logout Succesfull`);
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [setPath.pending]: (state) => {
      state.isLoading = true;
    },
    [setPath.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.folder = action.payload.directory;
      toast.success("Folder set successfully");
    },
    [setPath.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [getMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.files = action.payload;
    },
    [getMovies.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error("Cannot fetch files");
    },
  },
});

export const { setEmail, setFolder } = userSlice.actions;
export default userSlice.reducer;
