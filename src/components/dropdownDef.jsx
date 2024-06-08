"use client";

import { Dropdown } from "flowbite-react";

export default function DropdownDef1() {
  return (
    <Dropdown className="bg-white" label="Categories">
      <div className="p-2" onClick={() => alert("Dashboard!")}>
        Basic Establishment Services
      </div>
      <div className="p-2" onClick={() => alert("Settings!")}>
        Product Certifications
      </div>
      <div className="p-2" onClick={() => alert("Earnings!")}>
        Finance Accounting Tax
      </div>
      <div className="p-2" onClick={() => alert("Sign out!")}>
        Talent Recruitment HR
      </div>
      <div className="p-2" onClick={() => alert("Sign out!")}>
        Legal Services
      </div>
    </Dropdown>
  );
}
