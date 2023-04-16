<script>
    import {page} from "$app/stores";
    import {getPB} from "$lib/utils/pockerBase.js";
    import {onMount} from "svelte";
    import {redirectURI, codeVerifier} from "$lib/store/googleAuthProvider.js";
    import {setSafeInterval} from "$lib/utils/safeInterval.js";
    import {goto} from "$app/navigation";

    const pb = getPB();
    let promise;
    let code = "";
    let dots = "";

    setSafeInterval(() => {
        dots += ".";
        if (dots.length > 3) {
            dots = "";
        }
    }, 500);

    onMount(async () => {
        code = $page.url.searchParams.get("code");

        promise = pb.collection("users").authWithOAuth2(
            "google",
            code,
            $codeVerifier,
            $redirectURI,
            {}
        )

        promise.then(() => {
            goto("/todo-list");
        })
    });
</script>

<svelte:head>
    <title>Pocket TODO | Authorization Redirect</title>
</svelte:head>

<div class="flex justify-center items-center h-screen">
    {#await promise}
        <h1 class="text-4xl animate-bounce">Redirecting{dots}</h1>
    {:catch error}
        <div class="flex flex-col gap-3 text-center">
            <h1 class="text-2xl text-red-500">Something went wrong...</h1>
            <p class="text-red-800">Try going back to the home page and start again</p>
            <a href="/" class="underline">
                Back to home page
            </a>
        </div>
    {/await}
</div>




