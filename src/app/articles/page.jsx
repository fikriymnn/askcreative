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
import { db, storage, firebaseAnalytics } from "../../../firebase/page";
import ArticlePage from "@/components/articles/articlePage";

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

async function Articles() {
  const dataArticle = await getDataArticles();
  return <ArticlePage dataArticle={JSON.parse(JSON.stringify(dataArticle))} />;
}

export default Articles;
