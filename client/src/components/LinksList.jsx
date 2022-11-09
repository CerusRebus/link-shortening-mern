import React from 'react'
import {Link} from "react-router-dom"

const LinksList = ({links}) => {
    if (!links.length) return <p className="center">No links yet</p>

    return (
        <table className="striped">
            <thead>
            <tr>
                <th>№</th>
                <th>Original</th>
                <th>Abbreviated</th>
                <th>Open</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td style={{wordBreak: 'break-all'}}><a href={link.from}>{link.from.length < 105 ? link.from : link.from.substring(0, 105) + '...'}</a></td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default LinksList