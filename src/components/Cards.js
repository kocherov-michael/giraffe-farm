import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import {Card} from './Card'

export const Cards = ({giraffes, cellId, onRemove}) => {
    
    const [giraffeState, setGiraffeState] = useState(giraffes)
    
    const addCard = () => {
        // добавляю шаблон новой карточки так, чтобы он выводился слева
        const newState = [
            {
                id: giraffeState.length,
                name: ``,
                gender: '',
                weight: '',
                height: '',
                color: '',
                diet: '',
                character: '',
                img: '',
                edit: true,
                cell: cellId,
                readOnly: {}
            },
            ...giraffeState
        ]
        return setGiraffeState(newState)
    }

    // удаляю карточку 
    const removeCard = ({id, cell}) => {
        onRemove({id, cell}).then(() => {
            console.log('Жираф удален')
        })
        const newArr = giraffeState.slice()
        const newArr2 = newArr.filter(card => {

            return card.id !== id
        })
        setGiraffeState(newArr2)
    }

    // Сохраняю состояние списка карточек
    const changeState = (obj) => {
        const newState = giraffeState.slice()

        newState.map((card) => {
            if(card.id === obj.id) {
                for(let key in obj) {
                    card[key] = obj[key]
                }
            }
            return true
        })
        
        return setGiraffeState(newState)
    }

    useEffect(() => {
        
        // новых жирафов вывожу слева
        const newArr = giraffes ? giraffes.slice() : []
        setGiraffeState(newArr.reverse())

      }, [giraffes]);
    

    return (
        <div className="animals-wrapper">

            <div className="title">
                <span className="title__name">Жирафы</span>
                <span className="title__icon" onClick={() => addCard()}>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
            </div>
            <div className="animals">
                <div className="animals__container">

                {giraffeState.map((card, i) => (
                    <Card card={card} key={i} cellId={cellId} removeCard={removeCard} changeListState={changeState}/>
                ))}

                </div>
            </div>
        </div>
    )
}