import { useNavigate } from 'react-router-dom'

// COMPONENTS
import Button from "@/components/ui/Button/Button.tsx";

// ASSETS
import notFoundImg from '@/assets/img/404-error.svg'
import "./404.css"
import React from 'react'

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-404">
                <img src={notFoundImg} className="w-80" alt=""/>

                <Button btn-class="w-fit" name="nextButton" onClick={() => navigate('/')}>Go Back Home </Button>
            </div>
        </>
    )
}

export default NotFoundPage;