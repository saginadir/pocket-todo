<script>
    import {onMount} from "svelte";

    import googleIcon from "$lib/assets/google_logo.svg";
    import {getPB} from "$lib/utils/pockerBase.js";
    import {isLoggedIn} from "$lib/utils/loginSecurity.js";
    import {
        redirectURI,
        codeVerifier,
    } from "$lib/store/googleAuthProvider.js";

    let authUrl = '';

    const loggedIn = isLoggedIn()

    onMount(async () => {
        if (loggedIn) {
            return;
        }

        const pb = getPB();

        const authMethods = await pb.collection('users').listAuthMethods();
        const newGoogleProvider = authMethods.authProviders.find((provider) => provider.name === 'google');

        authUrl = newGoogleProvider.authUrl + $redirectURI;
        codeVerifier.set(newGoogleProvider.codeVerifier);
    })
</script>

<svelte:head>
    <title>Pocket TODO | Home Page</title>
</svelte:head>

<div class="flex flex-col items-center justify-between h-screen">
    <div>
        <div class="m-16"></div>
        <div class="flex flex-col gap-3 shadow-lg rounded-md p-3 w-[320px] ">
            <h1 class="text-4xl font-lobster text-center text-lime-500 mb-3">PocketTODO</h1>
            <a class="flex justify-center items-center gap-2 hover:cursor-pointer" href={authUrl}>
                <img src={googleIcon} alt="google logo">
                Sign in with Google
            </a>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
    </div>
    <div class="flex flex-col w-full">
        <nav class="flex gap-6 justify-center text-sm mb-2 text-gray-400">
            <a href="/terms-of-use">Terms Of Use</a>
            <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div class="w-full h-6 bg-lime-500"></div>
    </div>
</div>