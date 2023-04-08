import {writable, readable} from 'svelte/store';
import {browser} from "$app/environment";

const storedCodeVerifier = browser ? localStorage.getItem("codeVerifier") : "";
export const codeVerifier = writable(storedCodeVerifier);
codeVerifier.subscribe(value => {
    if (browser) {
        localStorage.setItem("codeVerifier", value);
    }
})
export const redirectURI = readable("http://localhost:5173/redirect");