import React from 'react'
import Navbar from '../../components/newcomps/navbar'
import CustomFooter from "@/components/CustomFooter";
import Image from 'next/image';
import GaleriPage from '../../components/galeri/galeriPage'
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


async function GetGaleri() {
    let data = [];
    try {
        const ordersRef = collection(db, "galleries");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(ordersRef);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            data.push({ ...doc.data(), id: doc.id });
        });
    } catch (error) {
        console.log(error);
    }
    return data;
}

async function Page() {
    const dataGaleri = await GetGaleri();
    return (
        <>
            <GaleriPage dataGaleri={JSON.parse(JSON.stringify(dataGaleri))} key={1} />
        </>
    )
}

export default Page