import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { 
    SeatsDetail,
} from 'pages/RoomAndSeatManagement/components';
import { 
    createSeatsThunk,
    modifySeatsThunk,
    CREATE_SEATS_FAILED,
    MODIFY_SEATS_FAILED 
} from 'modules/seats';
import { useRoom, useSeats } from 'common/hooks';


export default function SeatsFormContainer({ type, seatsData = null}){
    const dispatch = useDispatch();
    const history = useHistory();

    const partner = useSelector(state => state.auth.partner);
    const room = useRoom();
    const { name, rowSeatCount, colSeatCount, seatCount } = room;
    const [seats, setSeats] = useSeats(rowSeatCount, colSeatCount, seatsData);
    const [eventsStatus, setEventsStatus] = useState({
        mousedown: false,
    });
    const [startNumber, setStartNumber] = useState(1);
    const seatsInfo = [
        { label: '총 좌석 수', value: seatCount },
        { label: '가로 좌석 수(길이)', value: rowSeatCount},
        { label: '세로 좌석 수(길이)', value: colSeatCount},
    ]
    const [createdNumbers, setCreatedNumbers] = useState({});
    
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
    
    
    const createSeat = (x, y) => {
        if(seats[y][x]) return;
        
        
        const data = {
            number: startNumber,
            x,
            y,
            status: type
        };
       
        const newSeats = [...seats];
        newSeats[y][x] = data;
        setSeats(newSeats);

        let number;
        if(type === 'create'){
            number = startNumber;
        } else if(type === 'modify'){
            number = data.number;
        }
        setCreatedNumbers({
            ...createdNumbers,
            [number]: true
        });
    };

    const getNextStartNumber = () => {
        const validateDoubleCheck = (number) => {
            return number in createdNumbers;
        };
        
        let startNumber = null;
        const maxCount = colSeatCount * rowSeatCount;
        for(let number = 1; number <= maxCount; number++){
            if(!validateDoubleCheck(number)){
                startNumber = number;
                break;
            }
        }
        return startNumber;
    };
    
    useEffect(function updateCreatedNumbers(){
        if(type !== 'modify') return;

        const newCreatedNumbers = {};

        seatsData.forEach(data => {
            newCreatedNumbers[data.number] = true;
        });

        setCreatedNumbers(newCreatedNumbers);
    }, [seatsData]);

    useEffect(() => {
        setStartNumber(getNextStartNumber());
    }, [createdNumbers]);

    const handleSeatSelect = (e, x, y) => {
        e.stopPropagation();
        console.log('x, y: ', x, y);
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
    const handleSeatCancelClick = (e, x, y, number) => {
        e.stopPropagation();
        
        if(!seats[y][x]) return;

        const newSeats = [...seats];
        newSeats[y][x] = null;
        setSeats(newSeats);

        const newCreatedNumbers = {...createdNumbers};
        delete newCreatedNumbers[number];
        setCreatedNumbers({...newCreatedNumbers});
    };

    const handleMoveRoomListClick = () => {
        history.replace('/partner/rooms');
    };
    const handleMoveRoomModifyClick = () => {
        history.replace(`/partner/rooms/${room.id}/modify`);
    };

    let nextBtnText;
    if(type === 'create') nextBtnText = '좌석 생성';
    else if(type === 'modify') nextBtnText = '좌석 수정'; 

    const handleNextClick = () => {
        let successText, failedActionType, thunk;
        if(type === 'create'){
            successText = '생성';
            failedActionType = CREATE_SEATS_FAILED;
            thunk = createSeatsThunk;
        } else if(type === 'modify'){
            successText = '수정';
            failedActionType = MODIFY_SEATS_FAILED;
            thunk = modifySeatsThunk;
        }

        const parseSeats = (seats) => {
            const parsed = [];

            seats.forEach(row => {
                row.forEach(seat => {
                    if(!seat) return;

                    const { id, number, x, y } = seat;
                    const data = {
                        number,
                        x,
                        y
                    };
                   
                    parsed.push(data);
                });
            });

            return parsed;
        };

        const successCb = () => {
            alert(`좌석이 성공적으로 ${successText}되었습니다.`);
            history.replace(`/partner/rooms`);
        };

        const failedCb = (getState) => {
            
            const error = getState()
                .appStatus.errors.find(error => {
                    return error.type === failedActionType;
                })
            alert(`좌석을 생성할 수 없습니다. \n${error.errorMessage}`);
        };

        dispatch(thunk({ 
            partnerId: partner.id,
            roomId: room.id,
            seats: parseSeats(seats)
        }, {
            successCb,
            failedCb
        }));
    }

  

    return <SeatsDetail
        seats={seats}
        data={{
            startNumber
        }}
        boardHandlers={{
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
        roomName={name}
        seatsInfo={seatsInfo}
        handleMoveRoomListClick={handleMoveRoomListClick}
        handleMoveRoomModifyClick={handleMoveRoomModifyClick}
        nextBtnText={nextBtnText}
        handleNextClick={handleNextClick}
    />
}