import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shopping from "../view/Shopping";
import Cart from "../view/Cart";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/shopping" replace />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/shopping" replace />} />
      </Routes>
    </BrowserRouter>
  );
}