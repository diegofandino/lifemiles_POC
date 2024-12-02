import React, { useEffect, useRef, useState } from "react";
import { stringProject } from "../../../utils/stringProject";
import Button from "../../atoms/button/Button";

import ClipImage from "../../../assets/icons/clip_icon.svg";
import SendIcon from "../../../assets/icons/send_icon.svg";
import ClearIcon from "../../../assets/icons/clear_icon.svg";
import { customColors } from "../../../custom/custom-colors";
import CharacterIcon from "../../atoms/character-icon/CharacterIcon";
import BotImage from "../../../assets/chart_icon_bot.png";

let messageTemplate = {
	"action":"sendMessage",
	"body":{
	   "data":{
		  "message":"describeme que es un escenario de prueba"
	   }
	},
	"requestContext":{
	   "connectionId":"123454789"
	}
 }

const ChatModule = ({ setHideImages }) => {
  const {
    CHAT_TEXT_INIT,
    CHAT_INPUT_PLACEHOLDER,
    CHAT_OPTION_1_HELP,
    CHAT_OPTION_2_HELP,
    PDF_ONLY_TEXT,
    PDF_MAXIMUM_SIZE_TEXT,
  } = stringProject;

  const fileRef = useRef(null);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const GetInputFile = () => {
    const files = Array.from(fileRef.current.files);
    if (files[0].type !== "application/pdf") {
      setFileName("");
      alert(PDF_ONLY_TEXT);
    }
    setFileName(files[0].name);
    console.log("files:", files[0]);
  };

  const clearFileInput = () => {
    setFileName("");
    fileRef.current.value = "";
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://0ocpr99p16.execute-api.us-east-1.amazonaws.com/dev"
    );

    socket.onopen = () => {
      console.log("Connected to server");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);
      setMessages((prev) => [...prev, { ...message, client: false }]);
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(socket);

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    document
      .querySelector(".chat__elements")
      .scrollTo(0, document.querySelector(".chat__elements").scrollHeight);
  }, [messages]);

  const sendMessage = () => {
    const message = {
      message: inputRef.current.value,
      fileName: fileName,
    };

    if (socket) {
      messageTemplate.body.data.message = inputRef.current.value;
      console.log(JSON.stringify(messageTemplate));
      socket.send("message", JSON.stringify(messageTemplate));
      setMessages((prev) => [...prev, { ...message, client: true }]);
      clearFileInput();
      inputRef.current.value = "";
      setHideImages(true);
    } else {
      console.error("Socket is not initialized");
    }
  };

  return (
    <section
      className={`flex flex-col justify-center px-5 md:px-20 gap-3 ${
        messages.length > 0 ? "py-20" : "py-0"
      }`}
    >
      <div className="chat__elements flex flex-col gap-5 max-h-[500px] overflow-y-auto py-5">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className="chat__elements--items flex gap-5 w-full items-center"
            >
              <div
                className={`
						w-full
						p-4
						bg-white
						rounded-xl
						shadow-lg
						${message.client ? "text-right order-1" : "text-left order-2"}
					`}
                key={index}
              >
                {message.message} <br />
                {message.fileName && (
                  <a
                    style={{
                      backgroundColor: customColors.button_primary_color,
                    }}
                    href={message.fileName}
                    className="text-white py-1 px-4 rounded-xl my-6 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {message.fileName}
                  </a>
                )}
              </div>
              {message.client && (
                <CharacterIcon
                  classNames={message.client ? "order-2" : "order-1"}
                  string={localStorage.getItem("username")}
                />
              )}
              {!message.client && (
                <CharacterIcon image={BotImage} classNames="ml-auto" />
              )}
            </div>
          ))}
      </div>
      {!messages && <h4 className="text-center">{CHAT_TEXT_INIT}</h4>}
      <div className="relative">
        <input
          className={`input-primary shadow-lg max-w-full w-full outline-none pr-20 ${
            fileName && "pb-16 pt-6"
          }`}
          id="chat_input"
          ref={inputRef}
          placeholder={CHAT_INPUT_PLACEHOLDER}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        {fileName && (
          <div
            style={{
              backgroundColor: customColors.button_primary_color,
            }}
            className="max-w-[150px] sm:max-w-full absolute top-[70%] translate-y-[-70%] rounded-xl text-sm text-white left-2 py-1 px-4"
          >
            <div className="flex gap-2">
              <span className="max-w-[150px] sm:max-w-full text-ellipsis overflow-hidden sm:text-wrap sm:overflow-auto sm:w-full">
                {fileName}
              </span>
              <button onClick={clearFileInput} type="button">
                <img src={ClearIcon} alt="clear_icon" />
              </button>
            </div>
          </div>
        )}
        <div
          className={`flex gap-1 absolute ${
            fileName
              ? "top-[70%] translate-y-[-70%]"
              : "top-[50%] translate-y-[-50%]"
          }  right-5`}
        >
          <label htmlFor="upload">
            <img
              className="w-full max-w-[28px] object-contain cursor-pointer"
              src={ClipImage}
              alt="clip_image"
            />
            <input
              ref={fileRef}
              onChange={GetInputFile}
              accept="application/pdf"
              type="file"
              id="upload"
              className="hidden"
            />
          </label>
          <button onClick={sendMessage} type="button">
            <img
              className="w-full max-w-[28px] object-contain"
              src={SendIcon}
              alt="send_icon"
            />
          </button>
        </div>
      </div>
      {messages.length === 0 && (
        <div className="flex flex-col md:flex-row gap-3">
          <Button
            classNames={
              "bg-[#3366CC] w-full text-white text-sm py-[10px] px-2 lg:px-8 rounded-[100px]"
            }
            title={CHAT_OPTION_1_HELP}
            type="button"
          />
          <Button
            classNames={
              "bg-[#3366CC] w-full text-white text-sm py-[10px] px-2 lg:px-8 rounded-[100px]"
            }
            title={CHAT_OPTION_2_HELP}
            type="button"
          />
        </div>
      )}
      {messages.length > 0 && PDF_MAXIMUM_SIZE_TEXT && (
        <p className="text-sm text-left -mt-3">{PDF_MAXIMUM_SIZE_TEXT}</p>
      )}
    </section>
  );
};

export default ChatModule;
