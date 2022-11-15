import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

import Loader from "../components/Loader"
import LinksList from "../components/LinksList"

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const {token, userId} = useContext(AuthContext)
    const message = useMessage()

    const removeLinkHandler = async (id) => {
        try {
            const {success, message: msg} = await request('/api/link', 'DELETE', {id, userId}, {
                Authorization: `Bearer ${token}`
            })
            setLinks(links.filter(link => link._id !== id))
            message(success, msg)
        } catch (error) {
            return console.log(error)
        }
    }

    const fetchLinks = useCallback(async () => {
        try {
            const {links, message} = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            links ? setLinks(links)
                : setLinks(message)
        } catch (error) {
            return console.log(error)
        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) return <Loader/>

    return (
        <>
            {!loading && <LinksList links={links} removeLinkHandler={removeLinkHandler}/>}
        </>
    )
}

export default LinksPage