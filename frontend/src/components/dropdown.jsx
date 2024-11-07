import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export default function DropDown(props) {
  let displayRef = useRef(null);
  let holderRef = useRef(null);

  let [isActive, setIsActive] = useState(false);
  let clr = props.clr;
  let strokeClr = props.strokeClr;
  let val = props.val;

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#f5f5f5"
        }}
        ref={holderRef}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: strokeClr,
            border: `1px solid ${clr}`,
            padding: "var(--padding)",
            margin: 0
          }}
          className="container"
          onClick={() => {
            let display = displayRef.current;
            display.classList.toggle("display");
            display.classList.toggle("active");

            setIsActive(prev => !prev);
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              color: clr,
            }}
          >
            {!isActive ? <FontAwesomeIcon icon={faPlus} size="2x" /> : <FontAwesomeIcon icon={faMinus} size="2x"/>}
          </button>
        </div>
        <p
          className="display"
          ref={displayRef}
          style={{
            color: clr,
            backgroundColor: strokeClr,
            margin: 0
          }}
        >
          {val}
        </p>
      </div>
    </>
  );
}
