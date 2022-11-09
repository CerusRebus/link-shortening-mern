import React from 'react'

const LinkCard = ({link: {link}}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p style={{wordBreak: 'break-all'}} className="truncate">From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Number of clicks on the link: <strong>{link.clicks}</strong></p>
            <p>Date of creation: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </>
    )
}

export default LinkCard