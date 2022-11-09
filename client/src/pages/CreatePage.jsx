import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const navigate = useNavigate()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', {from: link}, {Authorization:`Bearer ${auth.token}`})
                navigate(`/detail/${data.link._id}`)
            } catch (error) {
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input onChange={(e) => setLink(e.target.value)} onKeyPress={pressHandler} value={link}
                           placeholder="Enter link" name="link" id="link" type="text"/>
                    <label htmlFor="link" className="active">Enter link</label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage