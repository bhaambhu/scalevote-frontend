import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { HTMLProps } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface ListTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[];
  data: T[];
  heading?: string;
  headingStyles?: HTMLProps<HTMLElement>["className"][];
  dataStyles?: HTMLProps<HTMLElement>["className"][];
}

const SlickTable = <T,>({
  columns,
  data,
  heading,
  className,
  headingStyles,
  dataStyles,
}: ListTableProps<T>) => {
  return (
    <div
      className={twMerge(
        "bg-white w-full rounded-md shadow-ppfas flex flex-col h-fit border-[#E4E7EB] border-[0.5px]",
        className
      )}
    >
      {heading && (
        <div className="font-semibold flex p-2 border-b text-xs md:text-sm md:p-3 border-[#E4E7EB] tracking-wide">
          {heading}
        </div>
      )}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={String(column.accessor)}
                        className={`px-2 py-1 md:px-3 md:py-2 text-start text-3xs lg:text-2xs text-gray-500 uppercase font-bold whitespace-nowrap ${
                          headingStyles ? headingStyles[index] : ""
                        }`}
                      >
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column, cellIndex) => (
                        <td
                          key={String(column.accessor)}
                          className={`p-2 md:p-3 text-2xs lg:text-xs text-gray-800 ${
                            dataStyles ? dataStyles[cellIndex] : ""
                          }`}
                        >
                          {row[column.accessor] as ReactNode}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SlickTable extends React.HTMLAttributes<HTMLDivElement> {
  tableHeadings: string[];
  tableData: ReactNode[][];
  heading?: string;
  headingStyles?: HTMLProps<HTMLElement>["className"][];
  dataStyles?: HTMLProps<HTMLElement>["className"][];
}

const X = ({
  tableHeadings,
  tableData,
  heading,
  className,
  headingStyles,
  dataStyles,
}: SlickTable) => {
  return (
    <div
      className={twMerge(
        "bg-white w-full rounded-md shadow-ppfas flex flex-col h-fit border-[#E4E7EB] border-[0.5px]",
        className
      )}
    >
      {heading && (
        <div className="font-semibold flex p-2 border-b text-xs md:text-sm md:p-3 border-[#E4E7EB] tracking-wide">
          {heading}
        </div>
      )}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y">
                <thead>
                  <tr>
                    {tableHeadings.map((heading, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`px-2 py-1 md:px-3 md:py-2 text-start text-3xs lg:text-2xs text-gray-500 uppercase font-bold whitespace-nowrap ${
                          headingStyles ? headingStyles[index] : ""
                        }`}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((data, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`p-2 md:p-3 text-2xs lg:text-xs text-gray-800 ${
                            dataStyles ? dataStyles[cellIndex] : ""
                          }`}
                        >
                          {data}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlickTable;
