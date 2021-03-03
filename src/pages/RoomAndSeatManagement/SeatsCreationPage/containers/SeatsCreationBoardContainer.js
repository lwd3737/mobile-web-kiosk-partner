import React, { useState } from 'react';

import { SeatsBoard } from 'pages/RoomAndSeatManagement/components';

export default function SeatsCreationBoardContainer({ room, useSeats }){
    const [seats, setSeats] = useSeats;


    return <SeatsBoard 
        room={room}
    />
}