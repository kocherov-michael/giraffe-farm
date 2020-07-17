import React from "react"
import {Navbar} from './Navbar'
import {Logo} from './Logo'

export const Aside = () => (
    <aside className="aside">
        <div className="aside__header">
            <Logo />
        </div>
        <div className="aside__nav">
            <Navbar />
        </div>
    </aside>
    
)