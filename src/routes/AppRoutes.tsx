import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "../pages/Timeline";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
