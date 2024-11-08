import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faBars } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main
        style={{
          width: "100%",
          minHeight: "calc(100vh - 2*(var(--padding)))",
          position: "relative",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            position: "absolute",
            left: "calc(2*var(--padding))",
            top: "calc(2*var(--padding))",
            color:'#f5f5f5'
          }}
        >
          <FontAwesomeIcon icon={faBars} size="2x" fontWeight={900}/>
        </button>
        <a
          href={import.meta.env.VITE_info}
          style={{
            position: "absolute",
            right: "calc(2*var(--padding))",
            top: "calc(2*var(--padding))",
          }}
        >
          <FontAwesomeIcon icon={faCircleInfo} size="2x" />
        </a>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
