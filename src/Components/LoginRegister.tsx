"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/LoginRegister.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUserFromAPI } from "@/store/userSlice";

const LoginRegister = () => {
  const loginFun = useSelector((state) => state.user.user);
  const searchParams = useSearchParams();
  const authStatus = searchParams.get("authStatus");
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("Users", loginFun);

  const currentAuthStatus = authStatus === "login" ? true : false;
  const [paramStatus, setParamStatus] = useState(currentAuthStatus);

  useEffect(() => {
    setParamStatus(authStatus === "login");
  }, [authStatus]);

  const handleParamStatusChange = () => {
    const newStatus = paramStatus ? "signup" : "login";
    router.push(`/auth?authStatus=${newStatus}`, { scroll: false });
  };

  const formInputRef = useRef({
    userName: "",
    email: "",
    password: "",
  });

  // inputs change function
  const handleFormInputChange = (key: string, value: string) => {
    formInputRef.current = {
      ...formInputRef.current,
      [key]: value,
    };
  };

  // submit form btn
  const formSubmitBtn = (e: any) => {
    e.preventDefault();

    dispatch(loginUserFromAPI(formInputRef.current));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmitBtn}>
        <h3 className={styles.logStatus}>{paramStatus ? "Login" : "Signup"}</h3>

        {/* inputs */}
        {!paramStatus && (
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => handleFormInputChange("email", e.target.value)}
          />
        )}

        <input
          className={styles.adjustBtn}
          type="text"
          placeholder={
            paramStatus
              ? "Enter your username or email"
              : "Enter a unique username"
          }
          onChange={(e) => handleFormInputChange("userName", e.target.value)}
        />

        <input
          type="password"
          placeholder={
            paramStatus ? "Enter your password" : "Create a password"
          }
          onChange={(e) => handleFormInputChange("password", e.target.value)}
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
