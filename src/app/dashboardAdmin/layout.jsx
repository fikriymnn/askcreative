"use client";

import { redirect } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { push } = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        children;

        // ...
      } else {
        push("/");
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      {children}
      {/* {uid != null ? children : redirect("/")} */}
    </>
  );
}
