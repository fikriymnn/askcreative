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

async function getDataWorkshopAromaterapi() {
    let data: { id: string; }[] = [];
    try {
        const ordersRef = collection(db, "aromaterapi_workshop");
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

async function AromaterapiWorkshop() {
    const dataAromaterapi = await getDataWorkshopAromaterapi();

    return <Aromaterapi dataAromaterapi={JSON.parse(JSON.stringify(dataAromaterapi))} />;
}

export default AromaterapiWorkshop;
