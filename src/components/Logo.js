import React from "react"
import logo from '../img/logo.jpg'

// логотип в сайдбаре
export const Logo = () => (
    
    <div className="logo">
        <img src={logo} alt="" className="logo__img"/>
        <div className="logo__text">
            Ферма Заслуженных Жирафов
            <div className="logo__subtitle">России и СНГ</div>
        </div>
    </div>
       
)