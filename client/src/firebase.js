// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnR8gfE05WZRRCUcXgmhIQJdnqg3fZGXc",
  authDomain: "video-stream-57c3d.firebaseapp.com",
  projectId: "video-stream-57c3d",
  storageBucket: "video-stream-57c3d.appspot.com",
  messagingSenderId: "46580329951",
  appId: "1:46580329951:web:9c31ab0b812ae1075c686a",
  measurementId: "G-XHCQDJ3BSD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
