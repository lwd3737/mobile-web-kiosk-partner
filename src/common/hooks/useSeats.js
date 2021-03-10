import { useState, useEffect } from 'react';

export default function useSeats(rowSeatCount, colSeatCount){
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
    
    return [seats, setSeats];
}