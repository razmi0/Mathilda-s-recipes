import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fetch from "node-fetch";

type Message = {
  role: string;
  content: string;
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const systemMessage: Message = {
    role: "system",
    content:
      'Complete the recipe talking like a chef and using the following ingredients as a base. Be concise and precise. Start each step with the coresponding step number and a double point(:). End the last sentence of each step with the characters : "&&"',
  };
  const defaultMessage: Message = {
    role: "user",
    content: "Answer this request with the sentence 'UNEXPECTED ERROR'",
  };
  const buildFetchOptions = (messages: Message[]) => {
    return {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.VITE_OPEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    };
  };

  try {
    if (event.body === null) throw new Error("No body");
    const res = await fetch(
      url,
      buildFetchOptions([...(JSON.parse(event.body) ?? defaultMessage), systemMessage])
    );
    return {
      statusCode: res.status,
      body: JSON.stringify(await res.json()),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
