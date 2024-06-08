import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase/page";
import FinaceAccountingPage from "@/components/service/finaceAccountingPage";

async function getDataFinanceServices() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Finance Accounting Tax"),
      where("subService", "==", "Finance Services"),
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
async function getDataFinanceAccounting() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Finance Accounting Tax"),
      where("subService", "==", "Accounting Services"),
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
async function getDataFinanceTax() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Finance Accounting Tax"),
      where("subService", "==", "Tax Services"),
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

async function FinanceAccountingTax() {
  const dataFinanceServices = await getDataFinanceServices();
  const dataFinanceAccounting = await getDataFinanceAccounting();
  const dataFinanceTax = await getDataFinanceTax();

  return (
    <FinaceAccountingPage
      dataFinanceServices={JSON.parse(JSON.stringify(dataFinanceServices))}
      dataFinanceAccounting={JSON.parse(JSON.stringify(dataFinanceAccounting))}
      dataFinanceTax={JSON.parse(JSON.stringify(dataFinanceTax))}
    />
  );
}

export default FinanceAccountingTax;
