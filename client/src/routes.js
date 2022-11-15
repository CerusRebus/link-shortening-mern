import React from "react"
import {Route, Routes} from "react-router-dom"

import LinksPage from "./pages/LinksPage"
import CreatePage from "./pages/CreatePage"
import DetailsPage from "./pages/DetailsPage"
import AuthPage from "./pages/AuthPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" element={<LinksPage/>}/>
                <Route path="/create" element={<CreatePage/>}/>
                <Route path="/detail/:id" element={<DetailsPage/>}/>
                <Route path="*" element={<CreatePage/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="*" element={<AuthPage/>} />
        </Routes>
    )
}