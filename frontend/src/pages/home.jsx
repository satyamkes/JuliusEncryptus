import { useEffect, useState } from "react";
import DropMenu from "../components/dropmenu";
import Error from "../components/error";
import axios from "axios";
import Chart from "chart.js/auto";

const style = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 656px)",
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    gap: "1em",
  },
  gridItem: {
    width: "100%",
  },
};

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

let englishFreq = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

let freqAnalysis = {
  a: 8.2,
  b: 1.5,
  c: 2.8,
  d: 4.3,
  e: 12.7,
  f: 2.2,
  g: 2.0,
  h: 6.1,
  i: 7.0,
  j: 0.15,
  k: 0.77,
  l: 4.0,
  m: 2.4,
  n: 6.7,
  o: 7.5,
  p: 1.9,
  q: 0.095,
  r: 6,
  s: 6.3,
  t: 9.1,
  u: 2.8,
  v: 0.98,
  w: 2.4,
  x: 0.15,
  y: 2,
  z: 0.074,
};

export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    Object.keys(Chart.instances).forEach((chartId) => {
      Chart.instances[chartId].destroy();
    });

    document.querySelectorAll("canvas").forEach((c) => {
      let ctx = c.getContext("2d");
      ctx.canvas.width = 656;
      ctx.canvas.height = 400;
    });
  }, []);

  useEffect(() => {
    let ctx = document.getElementById("english").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(englishFreq),
        datasets: [
          {
            label: "Frequency of English Alphabets",
            data: Object.keys(freqAnalysis).map((key) => freqAnalysis[key]),
            backgroundColor: "#fae27a",
            borderColor: "#d4a017",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: "#242424",
          },
        },
      },
      plugins: [plugin],
    });
  }, [englishFreq]);

  useEffect(() => {
    if (response) {
      const chartId = Object.keys(Chart.instances).find(
        (id) => Chart.instances[id].canvas.id === "solutions"
      );
      if (chartId) {
        Chart.instances[chartId].destroy();
      }

      let ctx = document.getElementById("solutions").getContext("2d");
      let data = [];
      let freq = null;
      response[0].forEach((str) => {
        freq = { ...englishFreq };
        for (let i = 0; i < str.length; i++) {
          let chk = Object.keys(freq).find((c) => c == str[i]);
          if (chk) {
            freq[str[i]] = freq[str[i]] + 1;
          } else continue;
        }
        data.push(freq);
      });
      let index = 0;
      new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(englishFreq),
          datasets: data.map((d, index) => {
            return {
              label: `Soln ${index + 1}`,
              data: Object.keys(d).map((key) => {
                return d[key];
              }),
            };
          }),
        },
        options: {
          plugins: {
            customCanvasBackgroundColor: {
              color: "#242424",
            },
          },
        },
        plugins: [plugin],
      });
    }
  }, [response]);

  return (
    <>
      {err ? <Error err={err} /> : null}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(90deg, #3C3C3C  1px, transparent 1px) 0 0, linear-gradient(180deg, #3C3C3C  1px, transparent 1px) 0 0",
          backgroundSize: "10em 10em",
          border: "1px solid #3C3C3C",
          boxShadow:
            "4px 4px 0 black, 6px 6px 0 rgba(0, 0, 0, 0.8), 8px 8px 0 rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={style.grid}>
          <div
            style={{
              ...style.gridItem,
              borderRadius: "24px",
              border: "1px solid #f5f5f5",
              backgroundColor: "#242424",
              boxShadow:
                "4px 4px 0 black, 6px 6px 0 rgba(0, 0, 0, 0.8), 8px 8px 0 rgba(0, 0, 0, 0.6)",
            }}
          >
            <form
              action=""
              method="POST"
              onSubmit={(event) => {
                axios
                  .post(import.meta.env.VITE_api_url, {
                    cipher: text,
                  })
                  .then((res) => {
                    setResponse(res.data.body);
                  })
                  .catch((err) => setErr(err));
                event.preventDefault();
              }}
            >
              <div
                className="container"
                style={{ display: "block", width: "100%" }}
              >
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    name="cipher"
                    id="cipher"
                    onChange={(event) => {
                      setText(event.target.value.toLowerCase());
                    }}
                    style={{
                      width: "100%",
                      height: "400px",
                      backgroundColor: "#242424",
                      border: "none",
                      padding: "var(--padding)",
                      textAlign: "center",
                      color: "#f5f5f5",
                      fontSize: "1rem",
                      fontWeight: 900,
                    }}
                    value={text}
                  />

                  <div
                    style={{
                      display: "block",
                      width: "100%",
                      position: "absolute",
                      bottom: "0",
                    }}
                  >
                    <input
                      type="submit"
                      value="Submit 📝"
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#f5f5f5",
                        padding: "var(--padding)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                      }}
                      id="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div style={style.gridItem}>
            {response ? (
              <DropMenu response={response} />
            ) : (
              <DropMenu response={[[], []]} />
            )}
          </div>
        </div>
        <div
          style={{
            ...style.grid,
            marginTop: "var(--padding)",
          }}
        >
          <div
            style={{
              ...style.gridItem,
              height: "400px",
              width: "100%",
              position: "relative",
            }}
          >
            <canvas
              id="english"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "4px 4px 0 black, 6px 6px 0 rgba(0, 0, 0, 0.8), 8px 8px 0 rgba(0, 0, 0, 0.6)",
                border: "1px solid white",
              }}
            ></canvas>
          </div>
          <div
            style={{
              ...style.gridItem,
              height: "400px",
              width: "100%",
              position: "relative",
            }}
          >
            <canvas
              id="solutions"
              style={{
                backgroundColor: "#242424",
                borderRadius: "24px",
                boxShadow:
                  "4px 4px 0 black, 6px 6px 0 rgba(0, 0, 0, 0.8), 8px 8px 0 rgba(0, 0, 0, 0.6)",
                border: "1px solid white",
              }}
            ></canvas>
          </div>
        </div>
      </section>
    </>
  );
}
