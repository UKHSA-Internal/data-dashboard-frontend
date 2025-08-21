import React from 'react'

export interface TableCard {
  id: number
  age: string
  vaccinations: string[]
}

interface TableCardProps {
  data: TableCard[]
}
const tableHeaders: string[] = ['Age', 'Vaccinations']

const TableCard: React.FC<TableCardProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto ">
        <thead className="w-full table-auto text-left">
          <tr>
            {tableHeaders.map((header, index) => (
              <th className="border-b border-grey-2 p-2 font-bold" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-left">
              <td className="border-b border-grey-2 p-2 align-top font-bold">{item.age}</td>
              <td className="border-b border-grey-2 p-2">
                <ul className="govuk-list--bullet">
                  {item.vaccinations.map((vaccine) => (
                    <li key={vaccine}>{vaccine}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableCard
