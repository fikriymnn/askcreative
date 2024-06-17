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
    <div>
      {registrants.length > 0 ? (
        registrants.map((registrant, index) => (
          <div key={registrant.id} className="registrant">
            <p>{index + 1}. {registrant.name} - {registrant.email} - {registrant.role} - {registrant.number}</p>
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
    <div className="bg-white flex-flex-col absolute w-full h-full z-40">
      {children}
        <h1>Registered People</h1>
      <RegistrantsList id={selectedId} />

    </div>
  );
};

export default ViewReg;
