import { collection, getDocs, where, query, orderBy } from "firebase/firestore";

import { db, storage, firebaseAnalytics } from "../../../../firebase/page";
import TalentRecruitmentHR from "@/components/service/talentRecruitmentHR";

async function getDataTalentTranslator() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Talent Recruitment HR"),
      where("subService", "==", "Translator Assistant"),
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
async function getDataTalentFinance() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Talent Recruitment HR"),
      where("subService", "==", "Finance Accounting Tax"),
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
async function getDataTalentMarketing() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Talent Recruitment HR"),
      where("subService", "==", "Marketing Sales"),
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
async function getDataTalentMenagement() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Talent Recruitment HR"),
      where("subService", "==", "Management Candidate"),
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
async function getDataTalentHR() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Talent Recruitment HR"),
      where("subService", "==", "HR Management Service"),
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

async function ProductTalent() {
  const dataTalentTranslator = await getDataTalentTranslator();
  const dataTalentFinance = await getDataTalentFinance();
  const dataTalentMarketing = await getDataTalentMarketing();
  const dataTalentMenagement = await getDataTalentMenagement();
  const dataTalentHR = await getDataTalentHR();

  return (
    <TalentRecruitmentHR
      dataTalentFinance={JSON.parse(JSON.stringify(dataTalentFinance))}
      dataTalentHR={JSON.parse(JSON.stringify(dataTalentHR))}
      dataTalentMarketing={JSON.parse(JSON.stringify(dataTalentMarketing))}
      dataTalentMenagement={JSON.parse(JSON.stringify(dataTalentMenagement))}
      dataTalentTranslator={JSON.parse(JSON.stringify(dataTalentTranslator))}
    />
  );
}

export default ProductTalent;
