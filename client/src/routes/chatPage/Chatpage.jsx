import React, { useEffect, useRef } from "react";
import "./chat.css";
import NewPrompt from "../../components/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const Chatpage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/chats/${chatId}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
    refetchInterval: 3000,
  });

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending && <div>Loading...</div>}
          {error && <div>Something went wrong</div>}
          {data?.history?.map((message, i) => {
            return (
              <>
                <>
                  {message.img && (
                    <IKImage
                      urlEndpoint="https://ik.imagekit.io/dxhkih2g4"
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                </>
                <div
                  className={
                    message.role === "user" ? "message user" : "message"
                  }
                  key={i}
                >
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </>
            );
          })}

          <NewPrompt data={data} />
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
