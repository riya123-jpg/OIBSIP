import Navbar from "../components/navbar/Navbar";

function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <Navbar />

      <main>{children}</main>
    </div>
  );
}

export default PublicLayout;
