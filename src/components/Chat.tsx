"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCompletion } from "@/server-actions/getCompletion";
import type { StoredMessage } from "@/types";
import { useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [message, setMessage] = useState("");
  const chatId = useRef<number | null>(null);

  const onClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);
    chatId.current = completions.id;
    setMessage("");
    setMessages(completions.messages as StoredMessage[]);
  };

  return (
    <div className="flex flex-col">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-5 flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md py-2 px-8`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <Button onClick={onClick} className="ml-3 text-xl">
          Send
        </Button>
      </div>
    </div>
  );
}
