import React from "react"

export const Update = ({data}) => (
    <div className="table-row">
        <div className="date-column">{data.date}</div>
        <div className="action-column">{data.action}</div>
        <div className="name-column">{data.name}</div>
        <div className="status-column">
            <div className={`table-status ${data.status}`}>{data.text}</div>
        </div>
    </div>
)
