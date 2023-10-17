import { Message } from "../types";

const buildFetchOptions = (reqBody: object) => {
  return {
    method: "POST",
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_OPEN_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
};

const systemMsg = {
  role: "system",
  content:
    "Complete the recipe talking like a chef and using the following ingredients as a base. Be concise and precise. Start each step with the coresponding step number and a double point(:). End the last sentence of each step with the characters : '&&'",
};

export const processToGPT = async (messages: Message[]) => {
  const fetchOptions = buildFetchOptions({
    model: "gpt-3.5-turbo",
    messages: [systemMsg, ...messages],
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", fetchOptions);
  const data = await res.json();

  return data.choices[0].message.content.split("&&");
};
