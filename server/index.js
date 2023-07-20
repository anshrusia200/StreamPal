const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const os = require("os");
const wdl = require("windows-drive-letters");
const { promisify } = require("util");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const axios = require("axios");

connectDB();
app.use(
  cors({
    origin: [/netlify\.app$/, /localhost:\d{4}$/, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("hi");
});
app.post("/auth", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ msg: "User not found" });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const email = decodedToken.user.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }
  return res.status(200).send(user);
});

app.post("/sign-up", async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already registered" }] });
    }
    user = new User({
      email,
    });
    await user.save();
    const payload = {
      user: {
        email: user.email,
      },
    };
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    console.log(token);
    return res.cookie("token", token, options).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

app.post("/sign-in", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
    }
    const payload = {
      user: {
        email: user.email,
      },
    };
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.cookie("token", token, options);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

app.post("/logout", auth, async (req, res) => {
  try {
    console.log("logout req");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).send("Logged out");
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

app.get("/get-drives", auth, async (req, res) => {
  var drives = wdl.usedSync();
  const platform = os.platform();
  if (platform == "win32") {
    drives = drives.map((drive) => drive + ":\\");
  }
  return res.send(drives);
});

app.post("/directories", async (req, res) => {
  const { currentPath, addPath } = req.body;
  // console.log("oldPath " + addPath);
  // console.log(currentPath, addPath);
  var newPath = addPath;
  console.log(newPath + " " + currentPath);
  if (currentPath) {
    newPath = path.join(currentPath.trim(), addPath.trim());
  }
  console.log(newPath);

  console.log("path " + newPath);
  try {
    const all_dirs_files = fs.readdirSync(newPath, { withFileTypes: true });

    const directories = all_dirs_files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    const files = all_dirs_files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    console.log(directories);
    console.log(newPath);
    const response = {
      directories: directories,
      files: files,
      path: newPath,
    };
    res.json(response);
  } catch (error) {
    console.error("Error while retrieving directory", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/back", async (req, res) => {
  const { currentPath } = req.body;
  const directory = path.dirname(currentPath);
  const backPath = path.join(directory, "");
  try {
    const all_dirs_files = fs.readdirSync(backPath, { withFileTypes: true });

    const directories = all_dirs_files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    const files = all_dirs_files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    const response = {
      directories: directories,
      files: files,
      path: backPath,
    };
    res.json(response);
  } catch (error) {
    console.error("Error while retrieving directory", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/setPath", auth, async (req, res) => {
  const { currentPath } = req.body;
  const userId = req.user._id;
  const updates = {
    directory: currentPath,
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

async function listVideoFiles(folderPath) {
  try {
    const files = await readdir(folderPath);

    const videoExtensions = [".mkv", ".mp4", ".avi", ".mov", ".wmv"];

    const videoFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return videoExtensions.includes(extension);
    });

    // console.log("Video Files:");
    return videoFiles;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

const getMetadata = async (name) => {
  const apiKey = "3a3fe7de614194be6cb9387f014794c0";
  const searchEndpoint = "https://api.themoviedb.org/3/search/multi";

  try {
    const response = await axios.get(searchEndpoint, {
      params: {
        api_key: apiKey,
        query: name,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      // const posterPath = results[0].poster_path;
      // if (posterPath) {
      //   const imageUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
      //   return imageUrl;
      // }
      return results[0];
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getVideoPosterArray = async (videoObjectArray) => {
  const videoPosterObjectArray = [];
  for (const videoObject of videoObjectArray) {
    let object = videoObject;
    let tempObject = await getMetadata(object.name.split(".")[0]);
    object.posterUrl = tempObject
      ? `https://image.tmdb.org/t/p/original${tempObject.poster_path}`
      : "https://res.cloudinary.com/appcloudansh/image/upload/v1689765821/Group_10_ycuou4.png";
    videoPosterObjectArray.push(object);
  }
  return videoPosterObjectArray;
};

app.post("/getVideoFiles", auth, async (req, res) => {
  const { folder } = req.body;
  const userId = req.user._id;
  console.log(userId);
  try {
    const videoFiles = await listVideoFiles(folder);
    const videoObjectArray = [];
    videoFiles.forEach((file) => {
      let object = {
        name: file,
        posterUrl: "",
      };
      videoObjectArray.push(object);
    });
    const videoPosterObjectArray = await getVideoPosterArray(videoObjectArray);
    const updates = {
      files: videoPosterObjectArray,
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    return res.status(200).send(videoPosterObjectArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

app.post("/", function (req, res) {
  // readDirectory("D:/")
  //   .then(() => {
  //     console.log("Directory reading completed");
  //   })
  //   .catch((err) => {
  //     console.error("Error during directory reading:", err);
  //   });
  // const selectedFolderPath = "/";
  // const folderStructure = scanFoldersForVideos(selectedFolderPath);
  // console.log(JSON.stringify(folderStructure, null, 2) + "hi");
  // const { path } = req.body;
  const drives = wdl.usedSync();
  return res.json(drives);
});

app.post("/setDrive", (req, res) => {});

app.post("/subfolders", async (req, res) => {
  const { path } = req.body;
  try {
    const directories = await getSubdirectories(path);
    res.json({ directories });
  } catch (error) {
    console.error("Error retrieving subdirectories:", error);
    res.status(500).json({ error: "Error retrieving subdirectories" });
  }
});

app.post("/set-folder", (req, res) => {
  const { path } = req.body;
  console.log(path);
  const directory = fs.readdirSync(path, { encoding: "utf8" });
  console.log(directory);
  return res.json(directory);
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  //joining path of directory
  // const directoryPath = path.("/Users/anshr/Downloads");
  // console.log(directoryPath);
  // get video stats (about 61MB)

  const directoryPath = "D:/movies";
  // const directory = [];
  const directory = fs.readdirSync(directoryPath, { encoding: "utf8" });
  // console.log(directory);
  const videoPath = path.join(directoryPath, directory[0]);
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
