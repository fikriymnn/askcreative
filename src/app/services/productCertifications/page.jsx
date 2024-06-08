import { collection, getDocs, where, query, orderBy } from "firebase/firestore";

import { db, storage, firebaseAnalytics } from "../../../../firebase/page";
import ProductCertification from "@/components/service/productCertification";
import { cache } from "react";

async function getDataProductBPOM() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "BPOM Food and Drug"),
      orderBy("createdAt", "desc")
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
async function getDataProductISO() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "ISO Management System"),
      orderBy("createdAt", "desc")
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
async function getDataProductSNI() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "SNI National Standard"),
      orderBy("createdAt", "desc")
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
async function getDataProductMedical() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "Medical and Hygiene"),
      orderBy("createdAt", "desc")
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
async function getDataProductPostel() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "POSTEL Telecommunication"),
      orderBy("createdAt", "desc")
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
async function getDataProductAlcohol() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "Alcohol and Cigarette"),
      orderBy("createdAt", "desc")
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
async function getDataProductOther() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Product Certifications"),
      where("subService", "==", "Other Certification"),
      orderBy("createdAt", "desc")
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

async function ProductCertifications() {
  const dataProductBPOM = await getDataProductBPOM();
  const dataProductISO = await getDataProductISO();
  const dataProductSNI = await getDataProductSNI();
  const dataProductMedical = await getDataProductMedical();
  const dataProductPostel = await getDataProductPostel();
  const dataProductAlcohol = await getDataProductAlcohol();
  const dataProductOther = await getDataProductOther();

  return (
    <ProductCertification
      dataProductBPOM={JSON.parse(JSON.stringify(dataProductBPOM))}
      dataProductISO={JSON.parse(JSON.stringify(dataProductISO))}
      dataProductSNI={JSON.parse(JSON.stringify(dataProductSNI))}
      dataProductMedical={JSON.parse(JSON.stringify(dataProductMedical))}
      dataProductPostel={JSON.parse(JSON.stringify(dataProductPostel))}
      dataProductAlcohol={JSON.parse(JSON.stringify(dataProductAlcohol))}
      dataProductOther={JSON.parse(JSON.stringify(dataProductOther))}
    />
  );
}

export default ProductCertifications;
