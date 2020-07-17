import React, {useState, useEffect, useContext} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faVenusMars, faBalanceScale, faRulerVertical, faPencilAlt, faTrashAlt, faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {DatabaseContext} from '../context/database/databaseContext'

export const Card = ({card, removeCard, changeListState}) => {
    const database = useContext(DatabaseContext)

    // состояние массива карточек жирафов
    const [giraffeState, setGiraffeState] = useState(card)
    
    // видимость меню редактирования
    const [cardMenu, setCardMenu] = useState(false)

    // состояние заполненности инпутов
    const [buttonColor, setButtonColor] = useState(false)

    // изменяю отделые свойства в состоянии карточки
    const changeState = (obj) => {
        const newState = Object.assign({}, giraffeState)
        
        for(let key in obj) {
            newState[key] = obj[key]
        }

        return setGiraffeState(newState)
    }

    // начать редактирование карточки
    const startEdit = () => {
        // скрыть меню редактирования
        setCardMenu(false)
        // возможность редактировать инпуты
        changeState({edit: true, readOnly: ''})
    }

    // обработчик кнопки Сохранить
    const submitHandler = event => {
        event.preventDefault()

        // если инпуты пустые, то сохраняться не будет
        if (buttonColor) return
        
        if (typeof giraffeState.id === 'string') {
            database.editCard(giraffeState).then(() => {
                console.log('Карточка была отредактирована')
              }).catch(() => {
                console.log('Что-то пошло не так')
              })
        } else {
            database.addCard(giraffeState).then(() => {
                console.log('Карточка была создана')
              }).catch(() => {
                console.log('Что-то пошло не так')
              })
        }

        changeState({ 'edit': false, readOnly: {readOnly: 'readOnly'} })
        changeListState(Object.assign({},giraffeState,{ 'edit': false, readOnly: {readOnly: 'readOnly'} }))
    }

    // проверяем инпуты на заполненность
    useEffect(() => {
        const inputs = [
            'character',
            'color',
            'diet',
            'gender',
            'height',
            'name',
            'weight'
        ]
        let isEmpty = false

        // если хотя бы 1 инпут пустой - сохранить нельзя
        inputs.forEach((input) => {
            if (giraffeState[input].trim() === '') {
                isEmpty = true
            } 
        })
        setButtonColor(isEmpty)
        
      }, [giraffeState]);

    useEffect(() => {
        // обнновление контента уже отрисованных катрочек при переключении вольеров
        setGiraffeState(card)
        //  скрытие меню редактирования при переключении вольеров
        setCardMenu(false)
      }, [card]);

    
    return (
        <div 
            className="animals__item"
            key={giraffeState.id}
        >
            <form className={`card${giraffeState.edit ? ' card--edit' : ''}` } onSubmit={submitHandler}>
                <div className="card__menu-icon" onClick={() => setCardMenu(!cardMenu)} >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div className={`card__menu${cardMenu ? ' card__menu--show' : ''}` }>
                    <ul className="card-menu">
                        <li onClick={() => startEdit()}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                            <span>Редактировать</span>
                        </li>
                        <li onClick={() => removeCard({id: giraffeState.id, cell: giraffeState.cell})}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            
                            <span>Удалить</span>
                        </li>
                    </ul>
                </div>
                <div className="card__img">
                    <div className="card-img">
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                </div>
                    <div className="card__title">
                        <input 
                            className="title__input"
                            type="text"
                            placeholder="Имя"
                            value={giraffeState.name}
                            onChange={e => changeState({'name': e.target.value})}
                            {...giraffeState.readOnly}
                        />
                    </div>
                <div className="card__icons">
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faVenusMars} />
                    </div>
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faBalanceScale} />
                    </div>
                    <div className="card-icon">
                        <FontAwesomeIcon icon={faRulerVertical} />
                    </div>
                </div>
                <div className="card__info">
                    <input 
                        type="text"
                        placeholder="-"
                        value={giraffeState.gender}
                        onChange={e => changeState({"gender": e.target.value})}
                        {...giraffeState.readOnly}
                    />
                    <input 
                        type="text"
                        placeholder="-"
                        value={giraffeState.weight}
                        onChange={e => changeState({"weight": e.target.value})}
                        {...giraffeState.readOnly}
                    />
                    <input 
                        type="text"
                        placeholder="-"
                        value={giraffeState.height}
                        onChange={e => changeState({"height": e.target.value})}
                        {...giraffeState.readOnly}
                    />
                </div>
                <div className="card__list">
                    <label className="property">
                        Цвет:
                        <input 
                            className="property__input"
                            type="text"
                            placeholder=""
                            value={giraffeState.color}
                            onChange={e => changeState({"color": e.target.value})}
                            {...giraffeState.readOnly}
                        />
                    </label>
                    <label className="property">
                        Диета:
                        <input 
                            className="property__input"
                            type="text"
                            placeholder=""
                            value={giraffeState.diet}
                            onChange={e => changeState({"diet": e.target.value})}
                            {...giraffeState.readOnly}
                        />
                    </label>
                    <label className="property">
                        Характер:
                        <input 
                            className="property__input"
                            type="text"
                            placeholder=""
                            value={giraffeState.character}
                            onChange={e => changeState({"character": e.target.value})}
                            {...giraffeState.readOnly}
                        />
                    </label>
                    
                </div>
                <div className="card__button">
                    <button className={`save-button ${buttonColor ? 'save-button--empty' : ''}`} type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}