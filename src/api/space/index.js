import client from '../client';

const getSpaceList = async () => {
    const res = await client.get('/spaces')
}