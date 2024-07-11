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
import Aromaterapi from "@/components/aromaterapi/aromaterapi";


async function getDataTitle() {
  let data = [];
  try {
    const docRef = doc(db, "aromaterapi_workshop", "title");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data[0].title;
}
async function getDataDescription() {
  let data = [];
  try {
    const docRef = doc(db, "aromaterapi_workshop", "description");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data[0].description;
}
async function getDataImages() {
  let data = [];
  try {
    const docRef = doc(db, "aromaterapi_workshop", "thumbnail");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data[0].img;
}
// async function getDataLayanan() {
//   let data = [];
//   try {
//     const ordersRef = collection(db,'aromaterapi_workshop', "Layanan");
   
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       //   console.log(doc.id, " => ", doc.data());
//       data.push({ ...doc.data(), id: doc.id });
//     });
//   } catch (error) {
//     console.log("error1");
//   }
//   return data;
// }

async function AromaterapiWorkshop() {
    const title = await getDataTitle();
    const description = await getDataDescription();
    const images = await getDataImages();
    // const layanan = await getDataLayanan();
    
    

    return <Aromaterapi  images={images}  /*layanan={JSON.parse(JSON.stringify(layanan))}*/  description={description} title={title}  />;
}

export default AromaterapiWorkshop;
