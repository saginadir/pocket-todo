<script>
    import googleIcon from "$lib/assets/google_logo.svg";
    import {onMount} from "svelte";
    import {getPB} from "$lib/utils/pockerBase.js";
    import {
        redirectURI,
        codeVerifier,
    } from "$lib/store/googleAuthProvider.js";

    let authUrl = '';

    onMount(async () => {
        const pb = getPB();

        const authMethods = await pb.collection('users').listAuthMethods();
        const newGoogleProvider = authMethods.authProviders.find((provider) => provider.name === 'google');

        authUrl = newGoogleProvider.authUrl + $redirectURI;
        codeVerifier.set(newGoogleProvider.codeVerifier);
    })
</script>

<svelte:head>
    <meta name="google-signin-client_id" content="425106235197-8k5anqpstcrsup0rqo75av8jtg8j669f.apps.googleusercontent.com">
</svelte:head>

<div class="flex justify-center m-10">
    <div class="flex flex-col gap-3 shadow-lg rounded-md p-3 w-[320px] ">
        <h1 class="text-4xl font-lobster text-center text-lime-500 mb-3">PocketTODO</h1>
        <a class="flex justify-center items-center gap-2 hover:cursor-pointer" href={authUrl}>
            <img src={googleIcon} alt="google logo">
            Sign in with Google
        </a>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
</div>
