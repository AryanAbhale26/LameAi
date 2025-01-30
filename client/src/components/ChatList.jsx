import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./sidebar.css";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/userchats", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
    refetchInterval: 3000,
  });

  return (
    <div className="chatList">
      <span className="title">Dashboard</span>
      <Link className="sp" to="/dashboard">
        Create a new chat
      </Link>
      <Link className="sp" to="/">
        Explore Lame AI
      </Link>
      <Link className="sp" to="/">
        Contact
      </Link>
      <hr className="hr" />
      <span className="title">Recent Chats</span>
      <div className="main flex flex-col">
        {isPending
          ? "Loading"
          : error
          ? "Something went wrong"
          : data?.map((chat) => {
              return (
                <Link
                  key={chat._id}
                  className="sp"
                  to={`/dashboard/chats/${chat._id}`}
                >
                  {chat.title}
                </Link>
              );
            })}
      </div>
      <hr className="hr" />
      <div className="upgrade">
        <img src="src/assets/logo.png" alt="logo" />
        <div className="texts">
          <span>Upgrade to Pro +</span>
          <span>Get Unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
