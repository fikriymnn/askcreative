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
import { db, storage, firebaseAnalytics } from "../../../firebase/page";
import PackagesPage from "@/components/packages/packagesPage";

async function getDataPackage() {
  let data = [];
  try {
    const ordersRef = collection(db, "package");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
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

async function Packages() {
  const dataPackage = await getDataPackage();

  return <PackagesPage dataPackage={JSON.parse(JSON.stringify(dataPackage))} />;
}

export default Packages;
