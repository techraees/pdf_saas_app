"use client";

import React, { createContext, useRef, useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { useToast } from "../ui/use-toast.js";

// Dummy data for testing
const dummyMessages = [
  {
    createdAt: new Date().toISOString(),
    id: "dummy-id-1",
    text: "Hello from user!",
    isUserMessage: true,
  },
  {
    createdAt: new Date().toISOString(),
    id: "dummy-id-2",
    text: "Hello back from AI!",
    isUserMessage: false,
  },
];

export const ChatContext = createContext({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

const ChatContextProvider = ({ fileId, children }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const backupMessage = useRef("");

  const sendMessage = async ({ message }) => {
    try {
      backupMessage.current = message;
      setMessage("");

      // Simulate sending message with Axios
      const response = await axios.post("/api/message", {
        fileId,
        message,
      });

      if (!response.data) {
        throw new Error("Failed to send message");
      }

      const accResponse = "Simulated AI response"; // Simulated AI response

      // Simulate updating infinite data
      const updatedMessages = [
        {
          createdAt: new Date().toISOString(),
          id: "ai-response",
          text: accResponse,
          isUserMessage: false,
        },
        ...dummyMessages, // Assuming dummyMessages is the existing messages
      ];

      return { updatedMessages };
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage(backupMessage.current);

      // Simulate error handling
      toast({
        title: "There was a problem sending this message",
        description: "Please refresh this page and try again",
        variant: "destructive",
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const addMessage = () => sendMessage({ message });

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
