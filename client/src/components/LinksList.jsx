import React from 'react'
import {Link} from "react-router-dom"

const LinksList = ({links, removeLinkHandler}) => {
    if (typeof links === 'string') return <p className="center">{links}</p>

    return (
        <table className="highlight">
            <thead>
            <tr>
                <th>№</th>
                <th>Original</th>
                <th>Abbreviated</th>
                <th>Open</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td style={{wordBreak: 'break-all'}}>{link.from.length < 105 ? link.from : link.from.substring(0, 105) + '...'}</td>
                        <td style={{wordBreak: 'break-all'}}>{link.to}</td>
                        <td>
                            <button className="btn btn-floating yellow darken-1 waves-effect waves-light" title="Open link"><Link to={`/detail/${link._id}`}><i className="material-icons">open_in_browser</i></Link></button>
                        </td>
                        <td>
                            <button onClick={() => removeLinkHandler(link._id)} className="btn btn-floating red darken-1 waves-effect waves-light" title="Delete link"><i className="material-icons">delete_sweep</i></button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default LinksList