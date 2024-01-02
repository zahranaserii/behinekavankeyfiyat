import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "../src/index.css";
import store from "./Redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
const theme = createTheme({
  direction: "rtl",
});
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Home />} path="/home" />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
