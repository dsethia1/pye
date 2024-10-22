import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "./global.css";

const chakraTheme = extendTheme({
  styles: { global: { img: { maxWidth: "unset" } } },
  colors: {
    gray: {
      50: "#f7fafc",
      100: "#fff",
      200: "#e2e8f0",
      300: "#77ceff",
      400: "#77ceff",
      500: "#77ceff",
      600: "#4a5568",
      700: "#77ceff",
      800: "#1a202c",
      900: "#77ceff",
    },
    blue2: {
      50: "#e5f6ff",
      100: "#b3e3ff",
      200: "#80d1ff",
      300: "#4dbfff",
      400: "#1aacff",
      500: "#00a3ff",
      600: "#0093e6",
      700: "#0072b3",
      800: "#005280",
      900: "#00314d",
    },
  },
  fonts: { heading: "Jost", body: "Jost" },
});
const emotionCache = createCache({
  key: "emotion-cache",
  prepend: true,
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={chakraTheme}>
        <App />
      </ChakraProvider>
    </CacheProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
