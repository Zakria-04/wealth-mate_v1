"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, useMemo } from "react";
import styles from "../styles/LoginRegister.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken, loginUserFromAPI } from "@/store/userSlice";
import { RootState, AppDispatch } from "../store/store";

const LoginRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const authStatus = searchParams.get("authStatus");

  const isLoginMode = authStatus === "login";
  const [paramStatus, setParamStatus] = useState(isLoginMode);

  // Memoize selector for optimization
  const { user, loading, error, token } = useSelector(
    (state: RootState) => state.user
  );

  console.log("user is", user);

  useEffect(() => {
    setParamStatus(isLoginMode);
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

  const handleFormInputChange = (key: string, value: string) => {
    formInputRef.current = {
      ...formInputRef.current,
      [key]: value,
    };
  };

  const formSubmitBtn = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUserFromAPI(formInputRef.current))
      .unwrap()
      .then((loginResponse) => {
        if (loginResponse) {
          dispatch(getUserToken(loginResponse.token));
        } else {
          console.error("No token received from login response");
        }
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmitBtn}>
        <h3 className={styles.logStatus}>{paramStatus ? "Login" : "Signup"}</h3>

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

        {error && <p className={styles.error}>{error}</p>}

        <a className={styles.forgotHelpText}>
          {paramStatus && "Forgot your password?"}
        </a>
        <button className={styles.logBtn} disabled={loading}>
          {loading ? "Processing..." : paramStatus ? "Login" : "Get Started"}
        </button>

        <p>
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
