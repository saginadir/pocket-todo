import PocketBase from 'pocketbase';
import { PUBLIC_PB_ADDRESS } from '$env/static/public';


const pb = new PocketBase(PUBLIC_PB_ADDRESS);

export const getPB = () => {
    return pb;
}
