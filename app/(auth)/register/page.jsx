"use client";

import React from "react";
// import RegisterForm from "./RegisterForm";
import Image from "next/image";
import RegisterForm from "./NewForm";

function MemberSignUp() {
  return (
    <div className="h-screen">
        <div className="bg-white z-50 h-[76px] p-4">
          <Image
            src="/mzeduLogo-noBg.png"
            alt="Mzedu SACCO Logo"
            width={100}
            height={100}
            className=""
          />
        </div>
      <div className="h-[calc(100vh-76px)] overflow-y-auto">
        <RegisterForm />
      </div>
    </div>
  );
}

export default MemberSignUp;
