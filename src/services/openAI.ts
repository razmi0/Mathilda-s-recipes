import { Message } from "../types";

type ReqBodyType = {
  model: string;
  messages: Message[];
};

type OpenAiKey = `sk-${string & { length: 48 }}`; // sk-<48 characters>

const isViableKey = (key: string): key is OpenAiKey => {
  const reg = /^sk-/;
  return reg.test(key) && key.length === 51;
};

const buildFetchOptions = (reqBody: ReqBodyType, key: string) => {
  if (!isViableKey(key)) {
    throw new Error("Invalid API");
  }
  return {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
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

export const processToGPT = async (messages: Message[], key : string) => {
  const fetchOptions = buildFetchOptions({
    model: "gpt-3.5-turbo",
    messages: [systemMsg, ...messages],
  }, key);

  const res = await fetch("https://api.openai.com/v1/chat/completions", fetchOptions);
  const data = await res.json();

  return data.choices[0].message.content.split("&&");
};
