import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

export const Information = ({toggleUpdates, toggleInfo, hide, cellsList, activeCell}) => {

    // заполненность вольера
    const [width, setWidth] = useState(0)

    // сколько каждый жираф занимает места
    const place = 15
    
    useEffect(() => {
        // рассчёт заполненности в процентах
        const getWidth = () => {
            return ((cellsList[activeCell] ? cellsList[activeCell].animals? cellsList[activeCell].animals.length: 0: 0) * place)
        }
        setWidth(getWidth)
    },[cellsList,activeCell])

    return (
        <div className={`info-card${ hide? ' info-card--hide' : '' }`}>
            <div className="info-card__close" onClick={() => toggleInfo()}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="info-card__head">
                {width}% <span>Заполнение вольера</span>
            </div>
            <div className="info-card__main">
                <div className="info-card__progress-bar">
                    <div className="info-card__progress-line" style={{width: `${width}%`}}></div>
                </div>
                <div className="info-card__button">
                    <button className="info-button" onClick={() => toggleUpdates()}>Информация</button>
                </div>
        
            </div>
        </div>
    )
}