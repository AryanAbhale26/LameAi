import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useId } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import ChatList from "../../components/ChatList";

const DashBoardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);
  if (!isLoaded) return "Loading.......";

  return (
    <div className="dashboardLayout flex gap-[50px] pt-[20px] h-full">
      <div className="menu flex-1">
        <ChatList />
      </div>
      <div className="content bg-black flex-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
