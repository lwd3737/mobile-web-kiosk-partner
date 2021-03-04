import React from 'react';
import styled, { css } from 'styled-components';

const isStatusCreateOrModify = (status) => {
    if(status === 'create' || status === 'modify') return true;
    return false;
};

export default function Seat({ 
    x, 
    y, 
    id, 
    number, 
    status,
    handlers 
}){
    const bindHandlers = () => {
        const _handlers = {
            onClick: null,
            onMouseEnter: null
        };
        const { 
            handleSeatSelectClick, 
            handleSeatSelectDrag,
        } = handlers || {};

        if(handleSeatSelectClick){
            _handlers.onClick = (e) => handleSeatSelectClick(e, x, y);
        } 
        if(handleSeatSelectDrag){
            _handlers.onMouseEnter = (e) => handleSeatSelectDrag(e, x, y);
        }

        return _handlers;
    }


    return (
        <S.Seat
            status={status}
            {...bindHandlers()}
        >
            {number && (
                <div className="number">{number}</div>
            )}
            {isStatusCreateOrModify(status) && (
                <div className="cancel"
                    onClick={() => handlers.handleSeatCancelClick(x, y, number)}
                >
                    X
                </div>
            )}

        </S.Seat>
    )
}

const S = {
    Seat: styled.div`
        ${({ theme, status }) => {
            const { colors } = theme;
            let backgroundColor;
            
            if(isStatusCreateOrModify(status)){
                backgroundColor = colors.green1;
            }
            
            return css`
                width: 2.6rem;
                height: 2.6rem;
                min-width: 45px;
                min-height: 45px;
                margin: 0.8rem;
                border-radius: 10px;
                background: ${backgroundColor || 'rgba(0,0,0,0.05)'};
                text-align: center;

                &:hover{
                    border: 3px solid ${colors.green1};
                    cursor: pointer;
                }

                .number{
                    padding-top: 12%;
                    margin-bottom: 5%;
                    font-weight: bold;
                    color: white;
                }

                .cancel{
                    color: #ff000038;
                    font-weight: bold;

                    &:hover{
                        color: red;
                    }
                }
            `
        }}
    `
}