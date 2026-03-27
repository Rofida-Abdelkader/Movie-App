import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0d1b2a] transition-colors duration-300">
      {}
      <Navbar />

      {}
      <main className="flex-grow">
        {children}
      </main>

      {}
      <BackToTop />

      {}
      <Footer />
    </div>
  );
};

export default Layout;