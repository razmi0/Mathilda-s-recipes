import { useState } from "react";
import { Message, RecipeType } from "../types";

type ReqBodyType = {
  model: string;
  messages: Message[];
};

export type OpenAiKey = `sk-${string & { length: 48 }}`; // sk-<48 characters>

const systemMsg = {
  role: "system",
  content:
    "Complete the recipe talking like a chef and using the given ingredients as a base. Be concise and precise. Start each step with the coresponding step number and a double point(:). End the last sentence of each step with the characters : '&&'",
};

const useGPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [APIkey, setAPIkey] = useState<OpenAiKey | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const isViableKey = (key: string): key is OpenAiKey => {
    const reg = /^sk-/;
    return reg.test(key) && key.length === 51;
  };

  const setUserMessages = ({ name, ingredients }: { name: RecipeType["name"]; ingredients: string[] }) => {
    const userMessage: Message = {
      role: "user",
      content: `Recette: ${name}\n Ingredients: ${ingredients.join(", ")}\n Instructions: \n`,
    };
    setMessages([userMessage]);
  };

  const processToGPT = async () => {
    setIsLoading(true);
    setIsError(false);

    if (!APIkey) {
      setIsError(true);
      console.warn("No API key provided");
      setIsLoading(false);
      return;
    }

    if (!isViableKey(APIkey)) {
      setIsError(true);
      console.warn("Invalid API key");
      setIsLoading(false);
      return;
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + APIkey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemMsg, ...messages],
      } as ReqBodyType),
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", fetchOptions);
    if (!res.ok) {
      setIsError(true);
      console.warn("Error fetching data : ", res.statusText, " - ", res.status);
      setIsLoading(false);
      return;
    }
    const data = await res.json();
    setIsLoading(false);

    return data.choices[0].message.content.split("&&") as RecipeType["steps"];
  };

  return { processToGPT, setAPIkey, isLoading, isError, setUserMessages, testKey: isViableKey };
};

export default useGPT;
