import {REMOVE_CARD, ADD_CARD, FETCH_CARDS, EDIT_CARD} from '../types'

const handlers = {
    [ADD_CARD]: (state, {payload}) => {
        const cards = [...state.cards]
        cards.map((cell, i) => {
            if (payload.cell === i){
                cell = {...cell, payload}
            } else {
                cards.push([payload])
            }
            return true
        })
        return ({
            ...state,
            cards
        })
    },
    [EDIT_CARD]: (state) => state,
    [FETCH_CARDS]: (state, {payload}) => ({...state, cards: payload, loading: false}),
    [REMOVE_CARD]: (state, { payload }) => {
        const cards = [...state.cards]
        cards.map((cell, i) => {
            if (payload.cell === i){
                delete cell[payload.id]
            } 
            return true
        })
        return ({
            ...state,
            cards
        })
    },
    DEFAULT: state => state
}

export const databaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}