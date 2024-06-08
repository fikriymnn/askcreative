import { collection, getDocs, where, query, orderBy } from "firebase/firestore";

import { db, storage, firebaseAnalytics } from "../../../../firebase/page";
import BasicEstablisPage from "@/components/service/basicEstablisPage";

const getDataServiceCompany = async () => {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Basic Establishment Services"),
      where("subService", "==", "Company Registration"),
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
};
const getDataServiceVisa = async () => {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Basic Establishment Services"),
      where("subService", "==", "Visa Registration"),
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
};
const getDataServiceTrademark = async () => {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Basic Establishment Services"),
      where("subService", "==", "Trademark"),
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
};
const getDataServiceOffice = async () => {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Basic Establishment Services"),
      where("subService", "==", "Office Administration"),
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
};
const getDataServiceConstruction = async () => {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Basic Establishment Services"),
      where("subService", "==", "Construction Certifications"),
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
};
const getDataServiceFactory = async () => {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Basic Establishment Services"),
      where("subService", "==", "Factory Licenses"),
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
};

async function Events() {
  const dataServiceCompany = await getDataServiceCompany();
  const dataServiceVisa = await getDataServiceVisa();
  const dataServiceTrademark = await getDataServiceTrademark();
  const dataServiceOffice = await getDataServiceOffice();
  const dataServiceConstruction = await getDataServiceConstruction();
  const dataServiceFactory = await getDataServiceFactory();

  return (
    <BasicEstablisPage
      dataServiceCompany={JSON.parse(JSON.stringify(dataServiceCompany))}
      dataServiceVisa={JSON.parse(JSON.stringify(dataServiceVisa))}
      dataServiceTrademark={JSON.parse(JSON.stringify(dataServiceTrademark))}
      dataServiceOffice={JSON.parse(JSON.stringify(dataServiceOffice))}
      dataServiceConstruction={dataServiceConstruction}
      dataServiceFactory={dataServiceFactory}
    />
  );
}

export default Events;
