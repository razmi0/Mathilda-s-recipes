import { useEffect, useState } from "react";

type ClipboardHookType =
  | {
      onPaste?: (text: string) => void;
      onCopy?: (text: string) => void;
      delayBeforeUnSuccess?: number;
    }
  | undefined;

const useClipboard = (props: ClipboardHookType | void) => {
  const [isReading, setIsReading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isSuccess, setIsSuccess] = useState<"idle" | boolean>("idle");
  const [error, setError] = useState<string | null>(null);

  const readClipboard = async () => {
    setIsReading(true);
    setIsSuccess(false);
    setError(null);

    if (!navigator.clipboard || !navigator.clipboard.readText) {
      setError("Clipboard API is not available");
      setIsReading(false);
      return;
    }

    if (!props || !props.onPaste) {
      setError("onPaste callback or props is not defined");
      setIsReading(false);
      return;
    }

    if (isReading) return;
    await navigator.clipboard.readText().then((txt) => {
      try {
        if (!props.onPaste) {
          setIsReading(false);
          return;
        }
        props.onPaste(txt);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else console.error(e);
      }
    });

    setIsReading(false);
    setError(null);
    setIsSuccess(true);
  };

  const copyToClipboard = async (text: string) => {
    setIsCopying(true);
    setError(null);
    setIsSuccess(false);

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      setError("Clipboard API is not available");
      setIsCopying(false);
      return;
    }

    if (isCopying) return;
    await navigator.clipboard.writeText(text).then(() => {
      if (!props || !props.onCopy) {
        setIsCopying(false);
        return;
      }
      try {
        props.onCopy(text);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else console.error(e);
      }
    });

    setIsCopying(false);
    setError(null);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess && props?.delayBeforeUnSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess("idle");
      }, props.delayBeforeUnSuccess);
      return () => clearTimeout(timeout);
    }
  });

  return { readClipboard, copyToClipboard, isReading, isCopying, error, isSuccess };
};

export default useClipboard;
