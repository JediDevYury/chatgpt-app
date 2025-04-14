"use server";
import { auth } from "@/auth.config";
import { createChat, getMessages, updateChat } from "@/db";
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

  if (!response.choices[0].message) {
    throw new Error("No response from OpenAI");
  }

  const assistantMessage = {
    role: response.choices[0].message.role as Role,
    content: response.choices[0].message.content || "",
  };

  const messages = [...messageHistory, assistantMessage];

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
    messages: await getMessages(chatId),
    id: chatId,
  };
}
