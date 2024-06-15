"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navigation from "@/components/admin/navigation";
import EventsDash from '@/components/newcomps/events-dash';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../firebase/page";
import EventPage from "@/components/events/eventPage";

async function GetDataEvents() {
  let data = [];
  try {
    const ordersRef = collection(db, "events");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function page() {
  const dataEvents = await GetDataEvents();
  
  return (
    <>
      <EventsDash dataEvents={JSON.parse(JSON.stringify(dataEvents))} key={1}/>
    </>
  );
}

export default page;
