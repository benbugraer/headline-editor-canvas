import { useState } from "react";

export const useSidebarState = () => {
  const [isIconDrawerOpen, setIsIconDrawerOpen] = useState(false);
  const [isHeadlineDrawerOpen, setIsHeadlineDrawerOpen] = useState(false);

  return {
    isIconDrawerOpen,
    setIsIconDrawerOpen,
    isHeadlineDrawerOpen,
    setIsHeadlineDrawerOpen,
  };
};
