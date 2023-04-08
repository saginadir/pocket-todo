import {onDestroy} from "svelte";

export const setSafeInterval = (callback, delay) => {
    const interval = setInterval(callback, delay);

    onDestroy(() => {
        clearInterval(interval);
    });
}