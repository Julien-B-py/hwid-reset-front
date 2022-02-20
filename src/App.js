import { useState, useEffect, forwardRef, useRef } from "react";
import { gsap } from "gsap";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";

import ButtonsGroup from "./components/ButtonsGroup";
import Footer from "./components/Footer";
import editHWID from "./api";
import { images } from "./constants";

import "./App.css";

function App() {
  const [input, setInput] = useState({ token: "", prevHWID: "", newHWID: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [operation, setOperation] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

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
        duration: 0.8
      })
      .from(q(".left-inner-child"), {
        yPercent: -100,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "Back.easeOut"
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSnackbarClose = () => {
    setError("");
    setSuccess("");
  }

  const submitData = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Delay operation to allow CircularProgress to be displayed for a while
    setTimeout(() => {
      editHWID(input).then((response) => {
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
              <img src={images.logo} alt="logo" />
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
                  color="warning"
                />

                <TextField
                  className="left-inner-child"
                  label="Previous HWID"
                  variant="standard"
                  name="prevHWID"
                  value={input.prevHWID}
                  onChange={(e) => handleChange(e)}
                  required
                  color="warning"
                />

                <TextField
                  className="left-inner-child"
                  label="New HWID"
                  variant="standard"
                  name="newHWID"
                  value={input.newHWID}
                  onChange={(e) => handleChange(e)}
                  required
                  color="warning"
                />
              </form>
            </div>

            <Button
              variant="contained"
              className="left-inner-child"
              onClick={(e) => submitData(e)}
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

            <ButtonsGroup />

            <Footer />
          </div>
        )}
      </div>

      <div className="right">
        <img src={images.bg} alt="background" />
      </div>
    </div>
  );
}

export default App;
