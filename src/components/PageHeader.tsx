import React from "react";

interface PageHeader extends React.HTMLAttributes<HTMLDivElement> {}
export default function PageHeader(props: PageHeader) {
  return (
    <h1 className="mb-4 text-center text-xs md:text-base font-semibold uppercase tracking-wide text-gray-900">
      {props.children}
    </h1>
  );
}
