import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

import styles from '../styles/authpage.module.css'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(false, error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const {success, message: msg,} = await request('/api/auth/register', 'POST', {...form})
            message(success, msg)
        } catch (error) {}
    }

    const loginHandler = async () => {
        try {
            const {success, message: msg, token, userId} = await request('/api/auth/login', 'POST', {...form})
            message(success, msg)
            auth.login(token, userId)
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
                                <input onChange={changeHandler} value={form.email} placeholder="Enter email" name="email" id="email" type="text" className={styles['yellow-input']}/>
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                            <div className="input-field">
                                <input onChange={changeHandler} value={form.password} placeholder="Enter password" name="password" id="password" type="password" className={styles['yellow-input']}/>
                                <label htmlFor="password" className="active">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button disabled={loading} onClick={loginHandler} className={`btn yellow darken-4 waves-effect waves-light ${styles['btn-login']}`} title="Login"><i className="material-icons left">lock_open</i>Sign IN</button>
                        <button disabled={loading} onClick={registerHandler} className="btn grey lighten-1 black-text waves-effect waves-light" title="Registration">Sign UP <i className="left material-icons">person_add</i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage