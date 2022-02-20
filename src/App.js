import { useState, useEffect, forwardRef, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";

import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";

import bg from "./bg.jpg";
import logo from "./logo.png";
import "./App.css";

function App() {
  const [input, setInput] = useState({ token: "", prevHWID: "", newHWID: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [operation, setOperation] = useState("error");
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    if (input.token && input.prevHWID && input.newHWID) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [input]);

  useEffect(() => {
    error && setOperation("error");
  }, [error]);

  useEffect(() => {
    success && setOperation("success");
  }, [success]);

  const leftRef = useRef();
  const q = gsap.utils.selector(leftRef);
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .from(leftRef.current, {
        width: 0,
        delay: 1.5,
        ease: "Circ.easeOut",
        duration: 1.3
      })
      .from(q(".left-inner-child"), {
        yPercent: -100,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "Back.easeOut"
      });
  }, []);

  async function editHWID() {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/reset-hwid",
        {
          token: input.token,
          prevHWID: input.prevHWID,
          newHWID: input.newHWID
        }
      );

      return data;
    } catch (error) {
      return { error: error.message };
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSnackbarClose() {
    setError("");
    setSuccess("");
  }

  async function send(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      editHWID().then((response) => {
        setError(response.error);
        setSuccess(response.success);
        if (response.success) {
          setInput({ token: "", prevHWID: "", newHWID: "" });
        }
        setLoading(false);
      });
    }, 800);
  }

  return (
    <div className="App">
      <div className="left" ref={leftRef}>
        {loading ? (
          <CircularProgress sx={{ color: "#FF8000" }} size={70} />
        ) : (
          <div className="left-inner">
            <div className="logo left-inner-child">
              <img src={logo} />
              <h1>VECR Project</h1>
            </div>

            <div>
              <h2 className="left-inner-child">HWID Reset</h2>
              <form>
                <Snackbar
                  open={error || success ? true : false}
                  autoHideDuration={4500}
                  onClose={() => handleSnackbarClose()}
                >
                  <Alert severity={operation} sx={{ width: "100%" }}>
                    {error || success}
                  </Alert>
                </Snackbar>

                <TextField
                  className="left-inner-child"
                  label="Token"
                  variant="standard"
                  name="token"
                  value={input.token}
                  onChange={(e) => handleChange(e)}
                  required
                  helperText="Numbers only"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />

                <TextField
                  className="left-inner-child"
                  label="Previous HWID"
                  variant="standard"
                  name="prevHWID"
                  value={input.prevHWID}
                  onChange={(e) => handleChange(e)}
                  required
                />

                <TextField
                  className="left-inner-child"
                  label="New HWID"
                  variant="standard"
                  name="newHWID"
                  type="text"
                  value={input.newHWID}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </form>
            </div>

            <Button
              variant="contained"
              className="left-inner-child"
              onClick={(e) => send(e)}
              style={{
                backgroundColor: "#FF8000",
                width: "64px",
                height: "64px",
                borderRadius: 20,
                margin: "0 auto"
              }}
              disabled={disableButton}
            >
              <ArrowForwardIcon />
            </Button>

            <div className="buttons left-inner-child">
              <Button
                style={{
                  backgroundColor: "#000",
                  width: "64px",
                  height: "32px",
                  borderRadius: 10,
                  alignSelf: "flex-end"
                }}
                onClick={() =>
                  window.open("https://github.com/ProbablyXS", "_blank")
                }
              >
                <i
                  className="fa-brands fa-github"
                  style={{ color: "#fff" }}
                ></i>
              </Button>

              <Button
                style={{
                  backgroundColor: "#5662F6",
                  width: "64px",
                  height: "32px",
                  borderRadius: 10
                }}
                onClick={() =>
                  window.open("https://discord.com/invite/arApVweA8y", "_blank")
                }
              >
                <i
                  className="fa-brands fa-discord"
                  style={{ color: "#fff" }}
                ></i>
              </Button>
            </div>

            <footer className="left-inner-child">
              <div className="footer-text">
                <div>
                  ©{currentYear === 2020 ? currentYear : `2020-${currentYear}`},{" "}
                  <a href="http://www.vecrproject.com/">VECR</a>.
                </div>
                Made with ♥️ by{" "}
                <a
                  className="footer-link"
                  href="https://github.com/Julien-B-py"
                >
                  {" Julien B. "}
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </footer>
          </div>
        )}
      </div>

      <div className="right">
        <img src={bg} />
      </div>
    </div>
  );
}

export default App;
