import { useState } from "react";

const useClipBoard = (onPaste: (text: string) => void) => {
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readClipboard = async () => {
    setIsReading(true);
    setError(null);

    if (!navigator.clipboard || !navigator.clipboard.readText) {
      setError("Clipboard API is not available");
      setIsReading(false);
      return;
    }

    if (isReading) return;
    await navigator.clipboard.readText().then((txt) => {
      try {
        onPaste(txt);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else console.error(e);
      }
    });

    setIsReading(false);
    setError(null);
  };

  return { readClipboard, isReading, error };
};

export default useClipBoard;
