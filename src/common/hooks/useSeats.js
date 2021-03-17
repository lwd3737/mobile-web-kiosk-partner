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

    const seats = initializeSeats(); 
    
    if(seatsData){
        seatsData.forEach(seat => {
            const { x, y } = seat;
            seats[y][x] = seat;
        });
    } 
    
    return useState(seats);
}