import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  startAt,
} from "firebase/firestore";

import { db, storage, firebaseAnalytics } from "../../../firebase/page";
import PoliciesPage from "@/components/policies/policiesPage";

async function getDataFo() {
  let data = [];
  try {
    const q = query(
      collection(db, "policies"),
      where("category", "==", "Foreign Company Registration")
    );

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

async function getDataTak() {
  let data = [];
  try {
    const q = query(
      collection(db, "policies"),
      where("category", "==", "Tax Regulation")
    );

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

async function getDataLabor() {
  let data = [];
  try {
    const q = query(
      collection(db, "policies"),
      where("category", "==", "Labor Policy")
    );

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

async function getDataImport() {
  let data = [];
  try {
    const q = query(
      collection(db, "policies"),
      where("category", "==", "Import Export Procedures & Policies")
    );

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

export default async function Policies() {
  const dataForeigen = await getDataFo();
  const dataTak = await getDataTak();
  const dataLabor = await getDataLabor();
  const dataImport = await getDataImport();

  return (
    <PoliciesPage
      dataForeigen={JSON.parse(JSON.stringify(dataForeigen))}
      dataImport={JSON.parse(JSON.stringify(dataImport))}
      dataLabor={JSON.parse(JSON.stringify(dataLabor))}
      dataTak={JSON.parse(JSON.stringify(dataTak))}
    />
  );
}
