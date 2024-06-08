import React from "react";

import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  doc,
  Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase/page";

import ServicesAdminPage from "../../../components/admin/service/servicePage";

async function getDataService() {
  let data = [];
  try {
    const q = query(collection(db, "service"), orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      data.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function ServicesAdmin() {
  const dataService = await getDataService();

  return <ServicesAdminPage data={JSON.parse(JSON.stringify(dataService))} />;
}

export default ServicesAdmin;
export const revalidate = 3;
