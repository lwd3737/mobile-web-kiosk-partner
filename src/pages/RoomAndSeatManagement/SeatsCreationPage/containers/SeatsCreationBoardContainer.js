import React, { useState, useEffect } from 'react';

import { SeatsBoard } from 'pages/RoomAndSeatManagement/components';

const makeSeatCb = (x, y, value) => {
    return (row, _y) => {
        if(_y === y){
            return row.map((seat, _x) => {
                if(_x === x){
                    return value
                }
                return seat;
            })
        }
        return row;
    }
};

export default function SeatsCreationBoardContainer({ 
    seats,
    setSeats,
    rowSeatCount,
    colSeatCount,
}){
    const [eventsStatus, setEventsStatus] = useState({
        mousedown: false,
    });
    const [startNumber, setStartNumber] = useState(1);
    
    const handleEventsStatus = (e) => {
        if(e.type === 'mousedown'){
            setEventsStatus({
                ...eventsStatus,
                mousedown: true
            });
        } else if(e.type === 'mouseup'){
            setEventsStatus({
                ...eventsStatus,
                mousedown: false
            });
        }
    };
    
    const [createdNumbers, setCreatedNumbers] = useState({});
    const getNextStartNumber = () => {
        const validateDoubleCheck = (number) => {
            return number in createdNumbers;
        };
        
        let startNumber = null;
        const seatCount = colSeatCount * rowSeatCount;
        for(let number = 1; number <= seatCount; number++){
            if(!validateDoubleCheck(number)){
                startNumber = number;
                break;
            }
        }

        return startNumber;
    };
    const createSeat = (x, y) => {
        if(seats[y][x]) return;
        
        const seat = {
            number: startNumber,
            status: 'create'
        };
        
        setSeats(seats.map(makeSeatCb(x, y, seat)));
        setCreatedNumbers({
            ...createdNumbers,
            [startNumber]: true
        });
    }

    useEffect(() => {
        setStartNumber(getNextStartNumber());
    }, [createdNumbers]);

    const handleSeatSelect = (e, x, y) => {
        e.stopPropagation();

        if(e.type === 'mousedown'){
            setEventsStatus({
                ...eventsStatus,
                mousedown: true
            })
        }

        createSeat(x, y);
    };
    const handleSeatSelectDrag = (e, x, y) => {
        if(!eventsStatus.mousedown) return;
       
        createSeat(x, y);
    };
    const handleSeatCancelClick = (x, y, number) => {
        if(!seats[y][x]) return;

        setSeats(seats.map(makeSeatCb(x, y, null)));
        const _createdNumbers = {...createdNumbers};
        delete _createdNumbers[number];
        setCreatedNumbers({..._createdNumbers});
    };

    return <SeatsBoard
        seats={seats}
        data={{
            startNumber
        }}
        handlers={{
            board: {
                onMouseDown: handleEventsStatus,
                onMouseUp: handleEventsStatus
            },
            seat: {
                handleSeatSelect,
                handleSeatSelectDrag,
                handleSeatCancelClick
            }
        }}
        
    />
}