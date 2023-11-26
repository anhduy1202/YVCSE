"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;