"use server";
import { auth } from "@/auth.config";
import { createChat, updateChat } from "@/db";
import type { Role } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(
  id: number | null,
  messageHistory: {
    role: "user" | "assistant";
    content: string;
  }[]
) {
  const session = await auth();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as {
      role: Role;
      content: string;
    },
  ];

  let chatId = id;

  if (!chatId) {
    chatId = await createChat(
      session?.user?.email ?? "",
      messageHistory[0].content,
      messages
    );
  } else {
    await updateChat(chatId, messages);
  }

  return {
    messages,
    id: chatId,
  };
}

export type { Role };
