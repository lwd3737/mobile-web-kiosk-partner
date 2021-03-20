import { useState, useEffect } from 'react';

export default function useSeats(rowSeatCount, colSeatCount, seatsData){
    const initializeSeats = () => {
        const _seats = []

        for(let y = 0; y < rowSeatCount; y++){
            _seats.push([]);
            for(let x = 0; x < colSeatCount; x++){
                _seats[y].push(null);
            }
        }

        return _seats;
    };

    const [seats, setSeats] = useState(initializeSeats());

    useEffect(() => {
        if(seatsData && seatsData.length > 0){
            const _seats = seats.map(row => [...row]);
            seatsData.forEach(seat => {
                const { x, y } = seat;
                _seats[y][x] = seat;
            });
    
            setSeats(_seats);
        } 
    }, [seatsData]);
    
    return [seats, setSeats];
}