import {Record} from "pocketbase";
import {getPB} from "$lib/utils/pockerBase.js";
import {goto} from "$app/navigation";
import {browser} from "$app/environment";

const pb = getPB()

export const loginSecurity = () => {
    if (browser && !(pb.authStore.model instanceof Record)) {
        pb.authStore.clear();
        goto('/')
    }
}

export const isLoggedIn = () => {
    if (browser && (pb.authStore.model instanceof Record)) {
        goto('/todo-list')
        return true
    }

    return false
}