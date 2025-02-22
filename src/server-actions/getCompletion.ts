"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Role = "user" | "assistant";

export async function getCompletion(
	messageHistory: {
	  role: Role;
	  content: string;
	}[]
  ) {
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

	return {messages}
}

export type { Role };