import React, {Fragment, useContext, useEffect, useState} from 'react'
import logo from '../img/logo.jpg'
import {Cards} from '../components/Cards'
import {DatabaseContext} from '../context/database/databaseContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {Information} from '../components/Information'
import {Updates} from '../components/Updates'

export const Giraffes = () => {
    const {cards, fetchCards, removeCard} = useContext(DatabaseContext)

    const [cellsList, setCellsList] = useState(cards)

    // видимость карточки с информацией
    const [info, setInfo] = useState(false)
    // видимость карточки с обновлениями
    const [update, setUpdate] = useState(false)

    const toggleUpdates = () => {
        setUpdate(!update)
    }

    const toggleInfo = () => {
        setInfo(!info)
    }

    useEffect(() => {
        fetchCards()
        // eslint-disable-next-line
    },[])

    const addCell = () => {
        
        const newState = [...cellsList]
        newState.push({ animals: [], id: newState.length})
        
        setCellsList(newState)
    }
    useEffect(() => {
        setCellsList(cards)
      }, [cards]);

    // состояние выбранного вольера
    const [activeCell, setActiveCell] = useState(0)

    return (
        <Fragment>
            <main className="main">
                <div className="header">
                    <div className="cells">
                        <div className="cells__list">
                            {cellsList.map((cell, i) => (
                                <div 
                                    key={i}
                                    className={`cells__list-item ${i === activeCell? 'active': ''}`} 
                                    onClick={() => setActiveCell(i)}
                                >
                                    {`Вольер ${i + 1}`}
                                </div>
                            ))}
                            
                        </div>
                        <div className="cells__add" onClick={() => addCell()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <div className="profile">
                        <div className="profile__bell">
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                        </div>
                        <div className="profile__img">
                            <img src={logo} alt="" />
                        </div>
                        <div className="profile__login">
                            hello@giraffe.com
                        </div>

                    </div>
                </div>

                    <Cards 
                        giraffes={ cellsList.length ? cellsList[activeCell]? cellsList[activeCell].animals: [] : []} 
                        cellId={cellsList.length ? cellsList[activeCell]? cellsList[activeCell].id: 0 : 0}
                        onRemove={removeCard}
                    />     
                
                <Updates toggleUpdates={toggleUpdates} hide={update} />
                
                <Information toggleUpdates={toggleUpdates} toggleInfo={toggleInfo} hide={info} cellsList={cellsList} activeCell={activeCell}/>
                
                    
            </main>
            
        </Fragment>
    )
}