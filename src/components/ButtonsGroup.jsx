import Button from "@mui/material/Button";

import buttons from "../constants/buttons";

// Buttons displayed under submit button
const ButtonsGroup = () => {
  return (
    <div className="buttons left-inner-child">
      {buttons.map((button, index) => (
        <Button
          key={index}
          style={{
            backgroundColor: button.bgColor,
            width: "64px",
            height: "32px",
            borderRadius: 10
          }}
          onClick={() => window.open(button.url, "_blank")}
        >
          <i
            className={`fa-brands fa-${button.icon}`}
            style={{ color: "#fff" }}
          ></i>
        </Button>
      ))}
    </div>
  );
};

export default ButtonsGroup;
