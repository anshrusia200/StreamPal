import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "register",
  async (email, thunkAPI) => {
    try {
      const body = {
        email: email,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/sign-up", body, config);
      return response.data;
    } catch (error) {
      const { msg } = error.response.data.errors[0];
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const login = createAsyncThunk("login", async (email, thunkAPI) => {
  try {
    const body = {
      email: email,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/sign-in", body, config);
    return response.data;
  } catch (error) {
    const { msg } = error.response.data.errors[0];
    return thunkAPI.rejectWithValue(msg);
  }
});

export const auth = createAsyncThunk("auth", async (signal, thunkAPI) => {
  try {
    const response = await axios.post("/auth", { signal });
    return response.data;
  } catch (error) {
    const { msg } = error.response.data.errors[0];
    return thunkAPI.rejectWithValue(msg);
  }
});

export const logout = createAsyncThunk("logout", async (req, res) => {
  try {
    const response = await axios.post("/logout");
    console.log(response.data);
    return response.data;
  } catch (error) {
    const { msg } = error.response.data.errors[0];
    return thunkAPI.rejectWithValue(msg);
  }
});

export const loadDrives = async (req, res) => {
  try {
    const response = await axios.get("/get-drives");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Error fetching drives");
  }
};

export const fetchSubdirectories = async (currentPath, addPath) => {
  try {
    const body = {
      currentPath: currentPath,
      addPath: addPath,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/directories", body, config);
    console.log(response.data.files);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchBackSubdirectories = async (currentPath, addPath) => {
  try {
    const body = {
      currentPath: currentPath,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/back", body, config);
    console.log(response.data.files);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const setPath = createAsyncThunk(
  "setPath",
  async (currentPath, thunkAPI) => {
    try {
      const body = {
        currentPath: currentPath,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put("/setPath", body, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const { msg } = error.response.data.errors[0];
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getMovies = createAsyncThunk(
  "getMovies",
  async (folder, thunkAPI) => {
    const body = {
      folder: folder,
    };
    try {
      const response = await axios.post("/getVideoFiles", body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const { msg } = error.response.data.errors[0];
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const addMetadata = createAsyncThunk(
  "getMetadata",
  async (filename, fileId, thunkAPI) => {
    try {
      const response = 3;
    } catch (error) {
      const { msg } = error.response.data.errors[0];
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
