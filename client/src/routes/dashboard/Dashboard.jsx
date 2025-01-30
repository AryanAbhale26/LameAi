import React from "react";
import "./dash.css";
import styled from "styled-components";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // Import the hook

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize the navigate function

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch("http://localhost:3000/api/chats", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`); // Use navigate to redirect
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  };

  return (
    <div className="dashboardPage flex flex-col items-center  justify-between">
      <div className="texts flex-1 flex flex-col items-center justify-center w-[50%] gap-[50px]">
        <div className="logo flex items-center justify-center gap-[20px] opacity-[0.2]">
          <img src="src/assets/logo.png" />
          <h1 className="">Lame Ai</h1>
        </div>
        <div className="options w-full flex items-center justify-between gap-[50px]">
          <div className="option">
            <img
              className="W-[40px] h-[40px] object-contain"
              src="src/assets/chat.png"
              alt=""
            />
            <span>Create new chat</span>
          </div>
          <div className="option">
            <img
              className="W-[40px] h-[40px] object-contain"
              src="src/assets/image.png"
              alt=""
            />
            <span>Analyse Image</span>
          </div>
          <div className="option">
            <img
              className="W-[40px] h-[40px] object-contain"
              src="src/assets/code.png"
              alt=""
            />
            <span>Help with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer flex px-3 py-1">
        <form
          className="flex justify-center items-center py-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="text"
            placeholder=" Ask me Mccc....."
            id=""
          />
          <button>
            <img src="src/assets/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
