import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"

import Loader from "../components/Loader"
import LinkCard from "../components/LinkCard"

const DetailsPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const linkId = useParams().id
    const [link, setLink] = useState(null)

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (error) {
            return console.log(error)
        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) return <Loader/>

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}

export default DetailsPage