"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function BreadcrumbArticle() {
  return (
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      className="py-3"
    >
      <Breadcrumb.Item href="/articles">Articles</Breadcrumb.Item>
      <Breadcrumb.Item>
        <p className="text-blue-600">asdasd</p>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
