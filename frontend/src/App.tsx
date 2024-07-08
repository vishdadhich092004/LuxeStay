import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}></Route>
        <Route path="/search" element={<>SearchPage</>}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
