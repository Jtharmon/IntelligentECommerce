import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white">
        <Link to="/" className="mr-4">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<h1>Cart Page (Coming Soon)</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
