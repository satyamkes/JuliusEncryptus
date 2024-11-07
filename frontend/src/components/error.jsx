import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faKeyboard} from "@fortawesome/free-solid-svg-icons";
import errorImg from "../assets/error.svg";
import { useEffect } from "react";
export default function Error(props) {
  let err = props.err;
  useEffect(() => {
    console.log(err)
    window.addEventListener("keypress", (e) => {
      window.location.reload();
    });
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            width: "80%",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderRadius: "24px",
            border: "1px solid red",
          }}
        >
          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{
              position: "absolute",
              top: "calc(10% + var(--padding))",
              right: "calc(10% + var(--padding))",
              background: "none",
              border: "none",
              color: "red",
              fontSize: "2rem",
            }}
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
          <h1
            style={{
              fontSize: "3rem",
              WebkitTextStroke: "1px red",
              margin: 0,
            }}
          >
            Status: {err.status || 400}
          </h1>
          <img
            src={errorImg}
            alt=""
            style={{
              width: "40%",
              filter: "invert(100)",
            }}
          />
          <p
            style={{
              fontWeight: 900,
            }}
          >
            {err.status != 404 ? err.response ? err.response.data.code : "ERR" : "WRONG_ROUTE"}{" : "}
            {err.status != 404 ? err.response ? err.response.data.msg : err.message : "This Route Doesn't Exist"}
          </p>
          <p>
            Press Any Key on the <FontAwesomeIcon icon={faKeyboard} />
            <b>to Reload</b>
          </p>
        </div>
      </div>
    </>
  );
}
