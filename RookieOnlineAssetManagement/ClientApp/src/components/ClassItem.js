import React from 'react'

export default function ClassItem(props) {
    const { presentation } = props
    var date = new Date(presentation.joinedDate)
    var month = date.getMonth()+1
  const items = [
    presentation.staffCode,
    presentation.fullName,
      presentation.userName,
      date.getDate() + "/" + month + "/" + date.getFullYear(),
      (presentation.type==1)?"Admin":"Staff",
  ]

  return (
    <tr>
      {[...items].map((item, index) => (
        <td className='align-middle' key={index}>
          {item}
        </td>
      ))}
      <td>
        <i className="bi bi-pencil-fill"></i>
        <i className="bi bi-x-circle"></i>
      </td>
    </tr>
  )
}
