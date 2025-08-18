import React from 'react'

export interface Person {
  id: number
  name: string
  role: string
}

interface TableDataProps {
  data: Person[]
}

const TableData: React.FC<TableDataProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="tableFixed min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableData
