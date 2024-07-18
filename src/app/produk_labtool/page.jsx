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
  import ProdukPage from "@/components/produk/produkpage";
import ProdukLabtoolpage from "@/components/produk/produkLabtoolpage";
  
  async function getDataArticles() {
    let data = [];
    try {
      const ordersRef = collection(db, "produk_labtool");
      const q = query(ordersRef, orderBy("desc"));
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
  
  async function AlatLabtool() {
    const dataArticle = await getDataArticles();
    return <ProdukLabtoolpage dataProduk={JSON.parse(JSON.stringify(dataArticle))}/>;
  }
  
  export default AlatLabtool;
  