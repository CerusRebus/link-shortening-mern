import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"

import Loader from "../components/Loader"
import LinksList from "../components/LinksList"

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const {links} = await request('/api/link/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(links)
        } catch (error) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) return <Loader/>

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
}

export default LinksPage