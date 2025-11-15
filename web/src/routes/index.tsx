import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {LoggedInGuard, LoggedOutGuard} from "@/routes/Guards/AuthGuard.tsx";

import DefaultLayout from "@/components/layouts/defaultLayout.tsx";
import BoardLayout from "@/components/layouts/BoardLayout.tsx";

import LoginPage from '@/views'
import RegisterPage from '@/views/register.tsx'
import BoardIndex from '@/views/Board/index.tsx'
import NotFoundPage from "@/views/NotFound/404.tsx";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route
                path={"/"}
                element={
                    // @ts-ignore
                    <LoggedOutGuard>
                        <DefaultLayout pageName="Sign in" children={<LoginPage />}/>
                    </LoggedOutGuard>
                }
            />
            <Route
                path={"/register"}
                element={
                    // @ts-ignore
                    <LoggedOutGuard>
                        <DefaultLayout pageName="Create Account" children={<RegisterPage />} />
                    </LoggedOutGuard>
                }
            />
            <Route
                path={"/board"}
                element={
                    // @ts-ignore
                    <LoggedInGuard>
                        <BoardLayout>
                            <BoardIndex />
                        </BoardLayout>
                    </LoggedInGuard>
                }
            />
            {/* not found */}
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default Router
