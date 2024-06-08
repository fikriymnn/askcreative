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
import ArticlesAdminPage from "@/components/admin/articles/articlesPage";

async function getDataArticles() {
  let data = [];
  try {
    const ordersRef = collection(db, "articles");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      data.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log("error");
  }
  return data;
}

async function ArticlesAdmin() {
  const dataArticles = await getDataArticles();

  return <ArticlesAdminPage data={JSON.parse(JSON.stringify(dataArticles))} />;
}

export default ArticlesAdmin;
export const revalidate = 3;
