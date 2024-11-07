import DropDown from "./dropdown";
export default function DropMenu(props) {
  let items = props.response;
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "block",
          backgroundColor: "#242424",
          paddingBlock: "var(--padding)",
          borderRadius: "24px",
          border: '1px solid #f5f5f5',
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {items[0].map((item) => {
          return <DropDown val={item} clr="darkgreen" strokeClr="rgba(0, 255, 0, 0.5)" key={item}/>;
        })}

        {items[1].map((item) => {
          return <DropDown val={item} clr="rgb(255, 0, 0)" strokeClr="rgba(255, 0 , 0, 0.5)" key={item}/>;
        })}
      </div>
    </>
  );
}
