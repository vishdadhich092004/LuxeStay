import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
