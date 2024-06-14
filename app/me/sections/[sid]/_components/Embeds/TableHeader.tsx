"use client"

export default function TableHeader() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          TYPE
        </th>
        <th scope="col" className="px-6 py-3">
          URL
        </th>
        <th scope="col" className="px-6 py-3">
          SIZE
        </th>
        <th scope="col" className="px-6 py-3">
          PRIORITY
        </th>
        <th scope="col" className="px-6 py-3">
          EMBED CODE
        </th>
        <th scope="col" className="px-6 py-3"></th>
      </tr>
    </thead>
  );
}
