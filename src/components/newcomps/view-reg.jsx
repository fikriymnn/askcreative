// import React from 'react'

// function ViewReg({id, children}) {
//   return (
//     <div className="bg-white flex-flex-col absolute w-full h-full z-40">
//         {children}
//         <p>{id}</p>
//     </div>
//   )
// }

// export default ViewReg
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../../firebase/page";

const RegistrantsList = ({ id }) => {
  const [registrants, setRegistrants] = useState([]);

  // Function to fetch registrants
  const fetchRegistrants = async (id) => {
    const eventDocRef = doc(db, "events", id);
    const registrantsCollectionRef = collection(eventDocRef, "registran");
    const registrantsSnapshot = await getDocs(registrantsCollectionRef);

    let registrants = [];
    registrantsSnapshot.forEach((doc) => {
      registrants.push({ id: doc.id, ...doc.data() });
    });

    return registrants;
  };

  // useEffect to fetch registrants when the component mounts or when id changes
  useEffect(() => {
    const getRegistrants = async () => {
      try {
        const registrantsData = await fetchRegistrants(id);
        setRegistrants(registrantsData);
      } catch (error) {
        console.error("Error fetching registrants: ", error);
      }
    };

    getRegistrants();
  }, [id]);

  return (
    <div className="bg-slate-200 p-1 w-[70%] rounded-md text-md">
      <div className="flex gap-2 w-full text-start justify-start border-b border-slate-700">
              <div className="line-clamp-1 w-1/12">No</div>
              <div className="line-clamp-1 w-5/12">Name</div>
              <div className="line-clamp-1 w-5/12">Email</div>
              <div className="line-clamp-1 w-5/12">Phone</div>
              <div className="line-clamp-1 w-5/12">Registered as</div>
            </div>
      {registrants.length > 0 ? (
        registrants.map((registrant, index) => (
          <div key={registrant.id} className="registrant flex gap-2 border-b border-slate-300 line-clamp-1 w-full text-start justify-start">
             <div className="line-clamp-1 w-1/12">{index + 1}</div>
              <div className="line-clamp-1 w-5/12">{registrant.name}</div>
              <div className="line-clamp-1 w-5/12">{registrant.email}</div>
              <div className="line-clamp-1 w-5/12">{registrant.number}</div>
              <div className="line-clamp-1 w-5/12">{registrant.role}</div>

          
          </div>
        ))
      ) : (
        <p>No registrants found.</p>
      )}
    </div>
  );
};

const ViewReg = ({ selectedId,children, available,capacity }) => {

  return (
    <div className="bg-white flex-flex-col absolute w-full h-full z-40 top-0">
      {children}
        <h1 className="text-xl font-semibold">Registered People</h1>
      <RegistrantsList id={selectedId} />

    </div>
  );
};

export default ViewReg;
