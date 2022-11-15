import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

import styles from '../styles/createpage.module.css'

const CreatePage = () => {
    const navigate = useNavigate()
    const {request} = useHttp()
    const {token, userId} = useContext(AuthContext)
    const [link, setLink] = useState('')
    const message = useMessage()

    const createLinkPress = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link, userId}, {Authorization:`Bearer ${token}`})
                message(data.success, data.message)
                navigate(`/detail/${data.link._id}`)
            } catch (error) {
                return console.log(error)
            }
        }
    }

    const createLinkClick = async () => {
        try {
            const data = await request('/api/link/generate', 'POST', {from: link, userId}, {Authorization:`Bearer ${token}`})
            message(data.success, data.message)
            navigate(`/detail/${data.link._id}`)
        } catch (error) {
            return console.log(error)
        }
    }

    return (
        <div className="row">
            <div className={`col s8 offset-s2 ${styles['wrapper']}`}>
                <div className="input-field col s8">
                    <input onChange={(e) => setLink(e.target.value)} onKeyDown={createLinkPress} value={link} placeholder="Enter link" name="link" id="link" type="text"/>
                    <label htmlFor="link" className="active">Enter link</label>
                </div>
                <button onClick={createLinkClick} disabled={!link.length} className={`btn waves-effect waves-light ${styles['btn-addLink']}`}><i className={`material-icons ${styles['btn-addLink__icon']}`}>note_add</i>Add link</button>
            </div>
        </div>
    )
}

export default CreatePage