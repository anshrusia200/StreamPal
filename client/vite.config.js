// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import os from "os";

// // const nets = os.networkInterfaces();
// // const results = Object.create(null); // Or just '{}', an empty object

// // for (const name of Object.keys(nets)) {
// //   for (const net of nets[name]) {
// //     // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
// //     // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
// //     const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
// //     if (net.family === familyV4Value && !net.internal) {
// //       if (!results[name]) {
// //         results[name] = [];
// //       }
// //       results[name].push(net.address);
// //     }
// //   }
// // }

// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   // const env = loadEnv(mode, process.cwd(), "");
//   return {
//     // vite config
//     // define: {
//     //   __SERVER_IP__: `"${results["Wi-Fi"][0]}"`,
//     // },
//     plugins: [react()],
//   };
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
