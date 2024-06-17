import React from "react";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  orderBy,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase/page";

import "@/components/admin/editor.css";
import EventsAdminPage from "@/components/admin/events/eventsPage";
// async function GetDataEvents() {
//   let data = [];
//   try {
//     const ordersRef = collection(db, "events");
//     const q = query(ordersRef, orderBy("createdAt", "desc"));
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots

//       data.push({ ...doc.data(), id: doc.id });
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   return data;
// }

async function GetDataEvents() {
    let data = [];
    try {
        const ordersRef = collection(db, "events");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        for (const doc of querySnapshot.docs) {
            const event = doc.data();
            const registrantsSnapshot = await getDocs(collection(doc.ref, "registran"));
            const registrants = registrantsSnapshot.docs.map(doc => doc.data());

            data.push({ ...event, id: doc.id, registrants });
        }
    } catch (error) {
        console.log(error);
    }
    return data;
}

async function EventsAdmin() {
  const dataEvents = await GetDataEvents();
  return <EventsAdminPage data={JSON.parse(JSON.stringify(dataEvents))} />;
}

export default EventsAdmin;
export const revalidate = 3;
