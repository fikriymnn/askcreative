import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../firebase/page";
import HomePage from "@/components/home/homePage";

async function getHeading() {
  let data = [];
  try {
    const docRef = doc(db, "editHomePage", "heading");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function getDataHomeParagraph() {
  let data = [];
  try {
    const docRef = doc(db, "editHomePage", "paragraph");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function getDataArticles() {
  let data = [];
  try {
    const ordersRef = collection(db, "articles");
    const q = query(ordersRef, orderBy("createdAt", "desc"), limit(2));
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

async function getDataArticles4() {
  let data = [];
  try {
    const ordersRef = collection(db, "articles");
    const q = query(ordersRef, orderBy("createdAt", "desc"), limit(5));
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

async function getDataPackage() {
  let data = [];
  try {
    const ordersRef = collection(db, "events");
    const q = query(ordersRef, orderBy("createdAt", "desc"), limit(3));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function Home() {
  const dataHeading = await getHeading();
  const dataParagraph = await getDataHomeParagraph();
  const dataArticle = await getDataArticles();
  const dataArticle4 = await getDataArticles4();
  const dataPackage = await getDataPackage();
  return (
    <HomePage
      dataArticle={JSON.parse(JSON.stringify(dataArticle))}
      dataArticle4={JSON.parse(JSON.stringify(dataArticle4))}
      dataHeading={JSON.parse(JSON.stringify(dataHeading))}
      dataPackage={JSON.parse(JSON.stringify(dataPackage))}
      dataParagraph={JSON.parse(JSON.stringify(dataParagraph))}
    />
  );
}

export default Home;
