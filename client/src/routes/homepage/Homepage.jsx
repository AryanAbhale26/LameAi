import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 120px;
    height: 40px;
    background-color: #000;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
  }

  .button + .button {
    margin-top: 16px; /* Add padding between the buttons */
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 0;
    left: -4px;
    top: -1px;
    margin: auto;
    width: 128px;
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .button::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .button:hover::after {
    filter: blur(30px);
  }

  .button:hover::before {
    transform: rotate(-180deg);
  }

  .button:active::before {
    scale: 0.7;
  }
`;

const Homepage = () => {
  // const test = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/test", {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       console.log("Test request sent successfully.");
  //       const data = await response.json();
  //       console.log(data);
  //     } else {
  //       console.error("Request failed with status:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error in test request:", error);
  //   }
  // };

  return (
    <div className="HomePage flex items-center gap-[100px] h-full">
      <img
        src="src/assets/orbital.png"
        className="orbit absolute bottom-0 left-0 opacity-[0.05]"
      />
      <div className="left flex-1 flex flex-col items-center justify-center gap-[16px] text-center">
        <h1 className="text-[126px] font-bold fu">LAME Ai</h1>
        <h2>Ask Anything but Don't Expect Anything</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
        </h3>

        <StyledWrapper>
          <Link to="/dashboard" className="button">
            Get Started
          </Link>
        </StyledWrapper>
      </div>

      <div className="right flex-1 flex items-center justify-center h-full">
        <div className="imgContainer flex items-center justify-center rounded-3xl w-[80%] h-[70%]">
          <div className="bgcContainer">
            <div className="bg"></div>
          </div>
          <img
            src="src/assets/b2.png"
            className="bot w-full h-full object-contain"
          />
          <div className="chat"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
