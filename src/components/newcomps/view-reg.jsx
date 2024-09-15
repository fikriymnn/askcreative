import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc,runTransaction } from "firebase/firestore";
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

  // Function to delete a registrant
  const handleDelete = async (registrantId) => {
  try {
    // Use Firestore's runTransaction for client-side transactions
    await runTransaction(db, async (transaction) => {
      const eventDocRef = doc(db, "events", id);
      const registrantDocRef = doc(eventDocRef, "registran", registrantId);

      // Fetch the event document to get the current quota
      const eventDoc = await transaction.get(eventDocRef);
      if (!eventDoc.exists()) {
        throw new Error("Event document does not exist!");
      }

      // Delete the registrant
      transaction.delete(registrantDocRef);

      // Increment the quota by 1
      const newQuota = eventDoc.data().quota + 1;
      transaction.update(eventDocRef, { quota: newQuota });
    });

    // After deleting, fetch the updated list of registrants
    const updatedRegistrants = await fetchRegistrants(id);
    setRegistrants(updatedRegistrants);

    // Show success alert
    alert("Registrant deleted successfully and quota updated!");
  } catch (error) {
    console.error("Error deleting registrant and updating quota: ", error);
    
    // Show error alert
    alert(`Error: ${error.message}`);
  }
};


  const handlecount = async() =>{
    try {
      const eventDocRef = doc(db, "events", id);
        const newQuota = eventDoc.data().quota + 1;
        transaction.update(eventDocRef, { quota: newQuota });
    } catch (error) {
      console.error("Error deleting registrant count: ", error);
    }
  }

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
        <div className="line-clamp-1 w-3/12">Name</div>
        <div className="line-clamp-1 w-3/12">Email</div>
        <div className="line-clamp-1 w-3/12">Phone</div>
        <div className="line-clamp-1 w-2/12">Registered as</div>
        <div className="line-clamp-1 w-1/12">Action</div>
      </div>
      {registrants.length > 0 ? (
        registrants.map((registrant, index) => (
          <div key={registrant.id} className="registrant flex gap-2 border-b border-slate-300 line-clamp-1 w-full text-start justify-start">
            <div className="line-clamp-1 w-1/12">{index + 1}</div>
            <div className="line-clamp-1 w-3/12">{registrant.name}</div>
            <div className="line-clamp-1 w-3/12">{registrant.email}</div>
            <div className="line-clamp-1 w-3/12">{registrant.number}</div>
            <div className="line-clamp-1 w-2/12">{registrant.role}</div>
            <div className="line-clamp-1 w-1/12">
              <button
                className="bg-red-500 text-white p-1 rounded-md"
                onClick={() => handleDelete(registrant.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No registrants found.</p>
      )}
    </div>
  );
};

const ViewReg = ({ selectedId, children }) => {
  return (
    <div className="bg-white flex-flex-col absolute w-full h-full z-40 top-0">
      {children}
      <h1 className="text-xl font-semibold">Registered People</h1>
      <RegistrantsList id={selectedId} />
    </div>
  );
};

export default ViewReg;
