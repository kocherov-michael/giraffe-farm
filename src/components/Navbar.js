import React from "react"
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTasks, faHorseHead, faUserFriends, faTools, faCog } from '@fortawesome/free-solid-svg-icons'

// навигация в сайдбаре
export const Navbar = () => {

    // параметры ссылок навигации в aside
    const navlinks = [
        {id: 0, to: "/main", icon: faHome, name: "Главная" },
        {id: 1, to: "/manage", icon: faTasks, name: "Управление" },
        {id: 2, to: "/giraffes", icon: faHorseHead, name: "Жирафы" },
        {id: 3, to: "/stuff", icon: faUserFriends, name: "Сотрудники" },
        {id: 4, to: "/options", icon: faCog, name: "Настройки" },
        {id: 5, to: "/support", icon: faTools, name: "Поддержка" },
    ]
    return (
    
        <nav className="nav">
            <ul className="nav-list">

                {navlinks.map(item => (
                    <li className="nav-list__item" key={item.id}>
                    <NavLink 
                        to={item.to} 
                        className="nav-list__item-link" 
                        >
                        <span>
                            <FontAwesomeIcon icon={item.icon} />
                        </span>
                        {item.name}
                    </NavLink>
                </li>
                ))}

            </ul>
        </nav>
    )
}