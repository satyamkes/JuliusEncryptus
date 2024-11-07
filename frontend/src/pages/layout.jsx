import Header from "../components/header";
import Footer from "../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main
        style={{
          width: "100%",
          height: "calc(100vh - 2*(var(--padding)))",
        }}
      >
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
