import { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import bg from "./bg.jpg";
import logo from "./logo.png";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.css";

function App() {
  const [input, setInput] = useState({ token: "", prevHWID: "", newHWID: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="left">
        {loading ? (
          <CircularProgress sx={{ color: "#FF8000" }} size={70} />
        ) : (
          <div className="left-inner">

<div className="logo">
  <img src={logo} />
  <h1>VECR Project</h1>
</div>


            <div>
              <h2>HWID Reset</h2>
              <form>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <TextField
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
                  label="Previous HWID"
                  variant="standard"
                  name="prevHWID"
                  value={input.prevHWID}
                  onChange={(e) => handleChange(e)}
                  required
                />

                <TextField
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
              onClick={(e) => send(e)}
              style={{
                backgroundColor: "#FF8000",
                width: "64px",
                height: "64px",
                borderRadius: 20,
                margin: "0 auto"
              }}
            >
              <ArrowForwardIcon />
            </Button>


            <Button                 style={{
                            backgroundColor: "#5662F6",
                            width: "64px",
                                            borderRadius: 10,

                          }}         >
<i className="fa-brands fa-discord" style={{color:'#fff'}}></i>
            </Button>



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
