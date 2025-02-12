"use client";

// import LoginRegister from "@/Components/LoginRegister";
import React from "react";
import dynamic from "next/dynamic";

const AuthPage = () => {
  const LoginRegister = dynamic(() => import('../../Components/LoginRegister'), {
    ssr: false
  });
  return (
    <>
      <LoginRegister />
    </>
  );
};

export default AuthPage;
