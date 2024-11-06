import NavBar from "./NavBar"
import Home from "./pages/Home"
import Graph from "./pages/Graph"
import Register from "./pages/Register"
import ProductTable from "./pages/ProductTable"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <NavBar />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product_table" element={<ProductTable />}></Route>
          <Route path="/graph" element={<Graph />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
