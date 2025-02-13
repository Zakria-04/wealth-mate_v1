"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../styles/LoginRegister.module.css";

const LoginRegister = () => {
  const searchParams = useSearchParams();
  const authStatus = searchParams.get("authStatus");
  const router = useRouter();

  const currentAuthStatus = authStatus === "login" ? true : false;
  const [paramStatus, setParamStatus] = useState(currentAuthStatus);

  useEffect(() => {
    setParamStatus(authStatus === "login");
  }, [authStatus]);

  const handleParamStatusChange = () => {
    const newStatus = paramStatus ? "signup" : "login";
    router.push(`/auth?authStatus=${newStatus}`, { scroll: false });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h3 className={styles.logStatus}>{paramStatus ? "Login" : "Signup"}</h3>

        {/* inputs */}
        {!paramStatus && (
          <input type="email" placeholder="Enter your email address" />
        )}

        <input
          className={styles.adjustBtn}
          type="text"
          placeholder={
            paramStatus
              ? "Enter your username or email"
              : "Enter a unique username"
          }
        />

        <input
          type="password"
          placeholder={
            paramStatus ? "Enter your password" : "Create a password"
          }
        />
        {/* -------- */}

        <a className={styles.forgotHelpText}>
          {paramStatus && "Forgot your password?"}
        </a>
        <button className={styles.logBtn}>
          {paramStatus ? "Login" : "Get Started"}
        </button>
        <p>
          {/* Don't have an account? <span>Sign up</span> now and get started! */}
          {paramStatus ? (
            <>
              Don&apos;t have an account?{" "}
              <span onClick={handleParamStatusChange}>Sign up</span> now and get
              started!
            </>
          ) : (
            <>
              Already a member?{" "}
              <span onClick={handleParamStatusChange}>Sign in</span> to access
              your account.
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginRegister;
