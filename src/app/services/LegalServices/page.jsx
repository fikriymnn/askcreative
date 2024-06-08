import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase/page";
import LegalServicePage from "@/components/service/legalServicePage";

async function getDataLegalAdministration() {
  let data = [];
  try {
    const q = query(
      collection(db, "service"),
      where("service", "==", "Legal Services"),
      where("subService", "==", "Legal Administration"),
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
  const dataLegalAdministration = await getDataLegalAdministration();

  return (
    <LegalServicePage
      dataLegalAdministration={JSON.parse(
        JSON.stringify(dataLegalAdministration)
      )}
    />
  );
}

export default ProductCertifications;
