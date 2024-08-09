import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewEventItems from "../pages/NewEventItems";
import Timeline from "../pages/Timeline";
import EditTimeline from "../pages/timeline/EditTimeline";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/add_item" element={<NewEventItems />} />
        <Route path="/timeline_item/:id" element={<EditTimeline />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
