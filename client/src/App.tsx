import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Auth
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";

// Pages
import PageView from "./features/pages/PageView";
import PageList from "./features/pages/PageList";
import PageEdit from "./features/pages/PageEdit";
import ContactPage from "./pages/Contact";

// Blogs
import BlogView from "./features/blogs/BlogView";
import BlogList from "./pages/Blog";
import BlogListAdmin from "./features/blogs/BlogList";
import BlogEdit from "./features/blogs/BlogEdit";

// Albums
import AlbumView from "./features/albums/AlbumView";
import AlbumList from "./features/albums/AlbumList";
import AlbumEdit from "./features/albums/AlbumEdit";

const App = () => {
  return (
    <div style={{ backgroundColor: "#111", maxWidth:"1400px", }}>
      <Header />
      {/* Main content area */}
      <main className="container" style={{ padding: "2rem", minHeight: "calc(100vh - 200px)", marginTop: "2rem", marginBottom: "2rem" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Pages */}
        <Route path="/pages/:id" element={<PageView />} />
        <Route path="/admin/pages" element={<RequireAuth><PageList /></RequireAuth>} />
        <Route path="/admin/pages/new" element={<RequireAuth><PageEdit /></RequireAuth>} />
        <Route path="/admin/pages/edit/:id" element={<RequireAuth><PageEdit /></RequireAuth>} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Blogs */}
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/admin/blogs" element={<RequireAuth><BlogListAdmin /></RequireAuth>} />
        <Route path="/admin/blogs/new" element={<RequireAuth><BlogEdit /></RequireAuth>} />
        <Route path="/admin/blogs/edit/:id" element={<RequireAuth><BlogEdit /></RequireAuth>} />
        <Route path="/blogs" element={<BlogList />} />

        {/* Albums */}
        <Route path="/albums/:id" element={<AlbumView />} />
        <Route path="/admin/albums" element={<RequireAuth><AlbumList /></RequireAuth>} />
        <Route path="/admin/albums/new" element={<RequireAuth><AlbumEdit /></RequireAuth>} />
        <Route path="/admin/albums/edit/:id" element={<RequireAuth><AlbumEdit /></RequireAuth>} />

        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
      </Routes>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
