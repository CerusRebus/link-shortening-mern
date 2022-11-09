import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (error) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (error) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten the link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input onChange={changeHandler} value={form.email} placeholder="Enter email" name="email" id="email" type="text" className="yellow-input"/>
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                            <div className="input-field">
                                <input onChange={changeHandler} value={form.password} placeholder="Enter password" name="password" id="password" type="password" className="yellow-input"/>
                                <label htmlFor="password" className="active">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button disabled={loading} onClick={loginHandler} className="btn yellow darken-4" style={{marginRight: 10}}>Sign IN</button>
                        <button disabled={loading} onClick={registerHandler} className="btn grey lighten-1 black-text">Sign UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage