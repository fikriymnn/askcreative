"use client";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";

export default function CustomTabs() {
  const components = [];
  const [comp, setComp] = useState(0);
  return (
    <Tabs.Group aria-label="Tabs with underline" style="underline">
      <Tabs.Item active onClick={() => setComp(1)} title="Company Registration">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Profile tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item title="Visa Registration">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboard tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item title="Trademark">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Settings tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item title="Office Administration">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item title="Construction Certification">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item title="Factory Licences">
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </Tabs.Item>
    </Tabs.Group>
  );
}
