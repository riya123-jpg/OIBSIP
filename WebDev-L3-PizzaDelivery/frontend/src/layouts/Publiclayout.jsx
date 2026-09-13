import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="public-layout">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
