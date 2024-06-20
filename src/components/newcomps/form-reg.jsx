'use client'
import React, { useState } from "react";
import { doc, addDoc, collection,runTransaction, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/page"; // Make sure this path is correct
import { useSearchParams } from "next/navigation";

const FormReg = ({ formregx, docId, roles }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!id) {
//       alert("Invalid event ID");
//       return;
//     }

//     try {
//       const eventDocRef = doc(db, "events", id);

//       await runTransaction(db, async (transaction) => {
//         // Add the new registran
//         await addDoc(collection(eventDocRef, "registran"), {
//           name: name,
//           email: email,
//           number: number,
//           role: role,
//         });

//         const eventDoc = await transaction.get(eventDocRef);
//         if (!eventDoc.exists()) {
//           throw new Error("Document does not exist!");
//         }

//         // Decrement the quota field
//         const newQuota = eventDoc.data().quota - 1;
//         transaction.update(eventDocRef, { quota: newQuota });
//       });

//       alert("Registration successful");
//       // Clear the form inputs
//       setName("");
//       setEmail("");
//       setNumber("");
//       setRole("");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

const [isEmail, setIsEmail] = useState(false);

 const handleChangeEmail = async (e) => {
        const emailValue = e.target.value;
        setIsEmail(false);
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("Invalid event ID");
      return;
    }

    try {
      const eventDocRef = doc(db, "events", id);
      const registranCollectionRef = collection(eventDocRef, "registran");

      // Check if the email is already registered
      const q = query(registranCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsEmail(true);
        return;
      }

      await runTransaction(db, async (transaction) => {
        // Add the new registran
        await addDoc(registranCollectionRef, {
          name: name,
          email: email,
          number: number,
          role: role,
        });

        const eventDoc = await transaction.get(eventDocRef);
        if (!eventDoc.exists()) {
          throw new Error("Document does not exist!");
        }

        // Decrement the quota field
        const newQuota = eventDoc.data().quota - 1;
        transaction.update(eventDocRef, { quota: newQuota });
      });

      alert("Registration successful");
      // setName("");
      // setEmail("");
      // setNumber("");
      // setRole("");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm mx-auto w-full justify-center">
      <div className="flex justify-center mx-auto w-6/12 h-5/6 my-10 bg-white border-2 rounded-md">
        <div className="w-full">
          {formregx}
          <form onSubmit={handleSubmit} className="mx-10">
            <div className="justify-center flex w-full">
              <p className="font-bold text-2xl mx-auto mb-10 mt-5">Form Registration</p>
            </div>
            <div className="flex flex-col justify-center w-full">
              <label>Name:</label>
              <input
                type="text"
                className="bg-slate-200 border-gray-400 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full mt-5">
              <label>Email:</label>
              <input
                type="email"
                className={`bg-slate-200  rounded-md ${isEmail?'border-red-500':'border-gray-400'}`}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmail(false); // Reset to false whenever email changes
                }}
                required
              />
              {isEmail? <>
              <p className="text-red-500">Email Already Registered</p>
              </>:null}
            </div>
            <div className="flex flex-col justify-center w-full mt-5">
              <label>No. WhatsApp:</label>
              <input
                type="text"
                className="bg-slate-200 border-gray-400 rounded-md"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="mt-5 flex flex-col justify-center">
              <label>Role:</label>
              
              <div className="flex justify-center items-center">
                <div className="relative z-20 bg-slate-200 rounded-md dark:bg-form-input w-full mt-2">
                  <select
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" className="text-body dark:text-bodydark">Select</option>
                    {roles.map((data, i) => {
                          return(
                            <>
                           <option value={data.header} className="text-body dark:text-bodydark">{data.header}</option>
                            </>
                          )
                        })}
                    
                   
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center w-full bg-green-600 rounded-md py-2 text-white font-bold text-xl my-10"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormReg;