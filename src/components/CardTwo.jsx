"use client";

import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  getDoc,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";

import { db } from ".././../firebase/page";
import Link from "next/link";

function CardTwo({
  title,
  price,
  text1,
  id,
  text2,
  text3,
  text4,
  text5,
  text6,
}) {
  const [dataService, setDataService] = useState([]);
  const idd = text2;

  // useEffect(() => {
  //   getDataService();
  // }, []);

  // const getDataService = async () => {
  //   let data = [];
  //   try {
  //     for (let i = 0; i < id.length; i++) {
  //       const docRef = doc(db, "service", id[i].id);
  //       const querySnapshot = await getDoc(docRef);

  //       data.push(querySnapshot.data());
  //       console.log(data);
  //     }
  //     setDataService(data);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  return (
    <Card>
      <h5 className="mb-4 text-lg text-black font-medium text-center">
        {title}
      </h5>
      <p className="mb-4 text-base font-medium text-blue-500 text-center">
        {price}
      </p>

      <ol className="my-7 space-y-5">
        <li className="flex space-x-3">
          <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            &bull; <span className="px-2">{text1}</span>
          </p>
        </li>
        <li className="flex space-x-3">
          <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            &bull; <span className="px-2">kk</span>
          </p>
        </li>
        <li className="flex space-x-3">
          <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            &bull; <span className="px-2">{text3}</span>
          </p>
        </li>
        <li className="flex space-x-3">
          <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            &bull; <span className="px-2">{text4}</span>
          </p>
        </li>

        <li className="flex space-x-3">
          <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            &bull; <span className="px-2">{text5}</span>
          </p>
        </li>
        <li className="flex space-x-3">
          <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            &bull; <span className="px-2">{text6}</span>
          </p>
        </li>
      </ol>
      <a
        className=' className="inline-flex w-full justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900'
        href={`/packages/details?id=${id}`}
      >
        <p>DETAILS</p>
      </a>
    </Card>
  );
}

export default CardTwo;
