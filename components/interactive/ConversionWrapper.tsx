"use client";

import StickyBar from "./StickyBar";
import FloatingBubble from "./FloatingBubble";
import ExitIntentModal from "./ExitIntentModal";

const ConversionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <StickyBar />
      <FloatingBubble />
      <ExitIntentModal />
    </>
  );
};

export default ConversionWrapper;