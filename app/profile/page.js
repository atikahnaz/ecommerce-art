"use client";
import Login from "@/components/auth/login";
import UserProfile from "@/components/user/UserProfile";
import { UserContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="">{user ? <UserProfile user={user} /> : <Login />}</div>
    </>
  );
}
