import { useEffect, useState } from "react";

export type ShortCut = {
  cb: (e: KeyboardEvent) => void;
  key: string;
  isAllowed: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
};

const useKeyboard = (initialShortcuts: ShortCut[]) => {
  const [shortcuts, setShortcuts] = useState<ShortCut[]>(initialShortcuts);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.map((shortcut: ShortCut) => {
        if (!shortcut.isAllowed) return;
        if (
          shortcut.key === e.key &&
          (shortcut.ctrlKey === undefined || shortcut.ctrlKey === e.ctrlKey) &&
          (shortcut.shiftKey === undefined || shortcut.shiftKey === e.shiftKey) &&
          (shortcut.altKey === undefined || shortcut.altKey === e.altKey) &&
          (shortcut.metaKey === undefined || shortcut.metaKey === e.metaKey)
        ) {
          if (shortcut.preventDefault) e.preventDefault();
          if (shortcut.stopPropagation) e.stopPropagation();
          shortcut.cb(e);
        }
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);

  return setShortcuts;
};

export default useKeyboard;
