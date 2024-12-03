import React, { useEffect, useRef, useState } from "react";
import { stringProject } from "../../../utils/stringProject";
import Button from "../../atoms/button/Button";

import ClipImage from "../../../assets/icons/clip_icon.svg";
import SendIcon from "../../../assets/icons/send_icon.svg";
import ClearIcon from "../../../assets/icons/clear_icon.svg";
import { customColors } from "../../../custom/custom-colors";
import CharacterIcon from "../../atoms/character-icon/CharacterIcon";
import BotImage from "../../../assets/chart_icon_bot.png";

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
  const timeoutRef = useRef(null); // Referencia para el timeout
  const [fileName, setFileName] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentServerMessage, setCurrentServerMessage] = useState("");

  const GetInputFile = () => {
    const files = Array.from(fileRef.current.files);
    if (files[0].type !== "application/pdf") {
      setFileName("");
      alert(PDF_ONLY_TEXT);
    }
    setFileName(files[0].name);
  };

  const clearFileInput = () => {
    setFileName("");
    fileRef.current.value = "";
  };

  const currentServerMessageRef = useRef("");

useEffect(() => {
  currentServerMessageRef.current = currentServerMessage; // Sincronizar el valor actual con la referencia
}, [currentServerMessage]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null; // Limpia la referencia
    }
  };

  const startTimeout = () => {
    resetTimeout(); // Asegurar que no haya un timeout previo activo
    timeoutRef.current = setTimeout(() => {
      const message = currentServerMessageRef.current; // Usar el valor más reciente
      if (message.trim()) { // Solo agregar si no está vacío
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, client: false },
        ]);
      }
      setCurrentServerMessage(""); // Limpiar el mensaje actual
    }, 2000);
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://0ocpr99p16.execute-api.us-east-1.amazonaws.com/dev/"
    );

    socket.onopen = () => {
      console.log("Connected to server");
    };

    socket.onmessage = (event) => {
      const message = event.data; // Fragmento recibido

      setCurrentServerMessage((prev) => prev + message); // Concatenar el fragmento
      resetTimeout();
      startTimeout();
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
      resetTimeout();
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(socket);

    return () => {
      socket.close();
      resetTimeout(); // Limpiar el timeout al desmontar
    };
  }, []);

  useEffect(() => {
    document
      .querySelector(".chat__elements")
      .scrollTo(0, document.querySelector(".chat__elements").scrollHeight);
  }, [messages, currentServerMessage]);

  const sendMessage = (inputValue) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        action: "sendMessage",
        body: {
          data: {
            message: inputValue,
          },
        },
        requestContext: {
          connectionId: "123454789",
        },
      };
      socket.send(JSON.stringify(message));

      setMessages((prev) => [
        ...prev,
        { message: inputValue, client: true },
      ]);

      clearFileInput();
      inputRef.current.value = "";
      setHideImages(true);
    }
  };

  return (
    <section
      className={`flex flex-col justify-center px-5 md:px-20 gap-3 ${
        messages.length > 0 ? "py-20" : "py-0"
      }`}
    >
      <div className="chat__elements flex flex-col gap-5 max-h-[500px] overflow-y-auto py-5">
        {messages.map((message, index) => (
          <div key={index} className="chat__elements--items flex gap-5 w-full items-center">
            <div
              className={`
                w-full
                p-4
                bg-white
                rounded-xl
                shadow-lg
                ${message.client ? "text-right order-1" : "text-left order-2"}
              `}
            >
              <p>{message.message}</p>
              {message.fileName && (
                <a
                  style={{
                    backgroundColor: customColors.button_primary_color,
                  }}
                  href={message.fileName}
                  className="text-white py-1 px-4 rounded-xl my-6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {message.fileName}
                </a>
              )}
            </div>
            {message.client ? (
              <CharacterIcon
                classNames="order-2"
                string={localStorage.getItem("username")}
              />
            ) : (
              <CharacterIcon image={BotImage} classNames="ml-auto" />
            )}
          </div>
        ))}
        {currentServerMessage && (
          <div className="chat__elements--items flex gap-5 w-full items-center">
            <div
              className={`
                w-full
                p-4
                bg-white
                rounded-xl
                shadow-lg
                text-left order-2
              `}
            >
              <p className="text-black">{currentServerMessage}</p>
            </div>
            <CharacterIcon image={BotImage} classNames="ml-auto" />
          </div>
        )}
      </div>

      {!messages.length && <h4 className="text-center">{CHAT_TEXT_INIT}</h4>}

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
              const inputValue = inputRef.current.value;
              sendMessage(inputValue); // Pasar el valor al handler
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
            fileName ? "top-[70%] translate-y-[-70%]" : "top-[50%] translate-y-[-50%]"
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
            classNames="bg-[#3366CC] w-full text-white text-sm py-[10px] px-2 lg:px-8 rounded-[100px]"
            title={CHAT_OPTION_1_HELP}
            type="button"
          />
          <Button
            classNames="bg-[#3366CC] w-full text-white text-sm py-[10px] px-2 lg:px-8 rounded-[100px]"
            title={CHAT_OPTION_2_HELP}
            type="button"
          />
        </div>
      )}
    </section>
  );
};

export default ChatModule;
