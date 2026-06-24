/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-[#070707] flex justify-center w-full font-sans text-white">
      <div className="w-full max-w-[430px] min-h-screen bg-[#0A0A0A] relative flex flex-col shadow-2xl overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
