import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Update} from './Update'

export const Updates = ({toggleUpdates, hide}) => {

    const updates = [
        {date: '01 июня 2020', action: 'Новый жираф', name: 'Пряник', status: 'wait', text: 'Ожидается'},
        {date: '20 апр 2020', action: 'Новый жираф', name: 'Матильда', status: 'done', text: 'Выполнено'},
        {date: '15 апр 2020', action: 'Редактировать', name: 'Шнур', status: 'unconfirmed', text: 'Не подтвержден'},
        {date: '05 апр 2020', action: 'Удалить', name: 'Ракета', status: 'done', text: 'Выполнено'},
        {date: '04 апр 2020', action: 'Перевод', name: 'Леонид', status: 'rejected', text: 'Отклонено'},
    ]

    
    return (
        <div className={`update-card${ hide? ' update-card--hide' : '' }`}>
            <div className="update-card__header">
                <div className="update-card__title">Обновления</div>
                <div className="update-card__close" onClick={() => toggleUpdates()}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            <div className="hr">
            </div>
            <div className="table-head">
                <div className="date-column">Дата</div>
                <div className="action-column">Действие</div>
                <div className="name-column">Жираф</div>
                <div className="status-column">Статус</div>
            </div>

            {updates.map((card, i) => (
                <Update key={i} data={card} />
            ))}

        </div>
    )
}