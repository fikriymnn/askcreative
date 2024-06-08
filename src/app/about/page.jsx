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
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../firebase/page";
import AboutPage from "@/components/about/aboutPage";

async function getDataAboutPhone() {
  let data = [];
  try {
    const docRef = doc(db, "editAbout", "phone");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data[0].no;
}

async function getDataHomeParagraph() {
  let data = [];
  try {
    const docRef = doc(db, "editAbout", "paragraph");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return [{ chi: data[0].chinese, ing: data[0].english }];
}

async function getDataHomeHeading() {
  let data = [];
  try {
    const docRef = doc(db, "editAbout", "heading");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return [{ ing: data[0].english, chi: data[0].chinese }];
}

async function getDataAboutAdress() {
  let data = [];
  try {
    const docRef = doc(db, "editAbout", "address");
    const querySnapshot = await getDoc(docRef);

    // doc.data() is never undefined for query doc snapshots

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data[0].address;
}
async function getDataAboutEmail() {
  let data = [];
  try {
    const docRef = doc(db, "editAbout", "email");
    const querySnapshot = await getDoc(docRef);

    data.push(querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
  return data[0].email;
}

async function About() {
  const address = await getDataAboutAdress();
  const email = await getDataAboutEmail();
  const heading = await getDataHomeHeading();
  const paragraf = await getDataHomeParagraph();
  const phone = await getDataAboutPhone();
  return (
    <AboutPage
      address={address}
      email={email}
      chinaHeading={heading[0].chi}
      inggrisHeading={heading[0].ing}
      chinaParagraph={paragraf[0].chi}
      inggrisParagraph={paragraf[0].ing}
      phone={phone}
    />
  );
}

export default About;
