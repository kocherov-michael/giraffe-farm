import React, {useReducer} from 'react'
import axios from'axios'
import {DatabaseContext} from './databaseContext'
import {databaseReducer} from './databaseReducer'
import {REMOVE_CARD, ADD_CARD, FETCH_CARDS, EDIT_CARD} from '../types'

const url = "https://giraffes-project.firebaseio.com"

export const DatabaseState = ({children}) => {
    const initialState = {
        cards: [],
        loading: false
    }
    const [state,dispatch] = useReducer(databaseReducer, initialState)


    const fetchCards = async () => {
        // во время запроса на сервер показываем лоадер
        const res = await axios.get(`${url}/zoo.json`)

        // добавляем каждому вольеру id с ключом, под которым он был в БД
        const payload = Object.keys(res.data || []).map(key => {
            
            const animals = Object.keys(res.data[key] || []).map(item => {
                return {
                    ...res.data[key][item],
                    id: item
                }
            })
            return {
                animals,
                id: +key
            }
        })

        dispatch({ type: FETCH_CARDS, payload })
    }

    // добавить карточку
    const addCard = async data => {
        const card = {
            name: data.name,
            gender: data.gender,
            weight: data.weight,
            height: data.height,
            color: data.color,
            diet: data.diet,
            character: data.character,
            img: data.img,
            edit: false,
            cell: data.cell,
            readOnly: {readOnly: 'readOnly'}
        }

        try{
            const res = await axios.post(`${url}/zoo/${data.cell}.json`, card)
            
            // в качестве id присваиваем поля, в которое в БД была сохранена заметка
            const payload = {
                ...card,
                id: res.data.name,
            }

            dispatch({ type: ADD_CARD, payload })
        } catch (e) {
            throw new Error(e.message)
        }
        fetchCards()
    }
        
    // редактировать карточку
    const editCard = async data => {
        data.edit = false
        data.readOnly = {readOnly: 'readOnly'}
        try{
            await axios.put(`${url}/zoo/${data.cell}/${data.id}.json`, data)
            
            const payload = {
                ...data,
            }

            dispatch({ type: EDIT_CARD, payload })
        } catch (e) {
            throw new Error(e.message)
        }
        fetchCards()
    }   

    // удалить карточку
    const removeCard = async card => {

        await axios.delete(`${url}/zoo/${card.cell}/${card.id}.json`)
        
        dispatch({
            type: REMOVE_CARD,
            payload: {
                id: card.id,
                cell: card.cell
            }
        })
        fetchCards()
    }


    return (
        <DatabaseContext.Provider value={{
            addCard, fetchCards, editCard, removeCard,
            cards: state.cards
        }}>
            {children}
        </DatabaseContext.Provider>
    )
}