import {writable, readable} from 'svelte/store';
import {browser} from "$app/environment";
import { PUBLIC_DOMAIN } from '$env/static/public';

const storedCodeVerifier = browser ? localStorage.getItem("codeVerifier") : "";
export const codeVerifier = writable(storedCodeVerifier);
codeVerifier.subscribe(value => {
    if (browser) {
        localStorage.setItem("codeVerifier", value);
    }
})
export const redirectURI = readable(`${PUBLIC_DOMAIN}/redirect`);