<script>
    import {getPB} from "$lib/utils/pockerBase.js";
    import {loginSecurity} from "$lib/utils/loginSecurity.js";
    import {onMount} from "svelte";
    import {randomSillyTodo} from "$lib/store/sillyTodos.js";
    import trashIcon from "$lib/assets/trash.svg";

    loginSecurity()

    const pb = getPB();

    let newTaskMode = true;
    let sillyTodo = "";
    let newTodoValue = "";
    let fetchingInitialTodos = true;

    const newTodoFieldLoaded = (el) => {
        el.focus();
    }

    let todos = [];

    onMount(async () => {
        const res = await pb.collection("todos").getList(1, 50, {sort: "created"});
        todos = res.items

        fetchingInitialTodos = false
    })

    const onSignOut = () => {
        pb.authStore.clear();
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13) {
            addNewTodo()
        }
    }

    const onWindowKeyControl = (e) => {
        if (e.keyCode === 13 && !newTaskMode) {
            enterNewTaskMode()
        }
        if (e.keyCode === 27 && newTaskMode) {
            exitNewTaskMode()
        }
    }

    const enterNewTaskMode = () => {
        newTaskMode = true;
        sillyTodo = randomSillyTodo();
    }

    const exitNewTaskMode = () => {
        newTaskMode = false;
    }

    const addNewTodo = async () => {
        const newTodo = {
            title: newTodoValue,
            checked: false,
            authorId: pb.authStore.model.id
        }

        todos = [...todos, newTodo]
        newTodoValue = ""

        await pb.collection("todos").create(newTodo)
    }

    const deleteTodo = async (todo) => {
        todos = todos.filter(t => t !== todo)
        await pb.collection("todos").delete(todo.id)
    }

    const toggleTodo = async (todo) => {
        const todoIndex = todos.findIndex(t => t.id === todo.id)
        todos[todoIndex].checked = !todo.checked
        todos = todos
        await pb.collection("todos").update(todo.id, todo)
    }

</script>

<svelte:window on:keydown={onWindowKeyControl}/>

<svelte:head>
    <title>Pocket TODO | TODO List</title>
</svelte:head>

<div class="flex items-center justify-between p-5">
    <h1 class="text-2xl font-lobster text-left text-lime-500">PocketTODO</h1>
    <a class="text-gray-300" href="/" on:click={onSignOut}>Sign out</a>
</div>

<div class="flex flex-col items-center justify-center mt-16">
    <h1 class="text-4xl font-lobster text-left text-lime-500 mb-8">My TODO List</h1>

    {#each todos as todo}
        <div class="flex group w-full max-w-[900px] px-5">
            <button class:line-through={todo.checked} class:text-gray-400={todo.checked}
                    class="basis-11/12 py-2 flex gap-3 cursor-pointer select-none"
                    on:click={() => {toggleTodo(todo)}}>
                <input class="w-6 h-6 rounded-lg cursor-pointer border-lime-500 border-2 bg-white text-lime-500 focus:ring-lime-200 "
                       type="checkbox" bind:checked={todo.checked}/>
                <span class="text-left">{todo.title}</span>
            </button>
            <div class="py-2">
                <button on:click={() => {deleteTodo(todo)}} class=" basis-1/12">
                    <img src={trashIcon} alt="delete todo"
                         class="w-7 h-7 md:invisible md:group-hover:visible underline p-1 rounded-md hover:bg-gray-50 hover:shadow-lg shadow"/>
                </button>
            </div>
        </div>
    {:else}
        <h2 class:invisible={fetchingInitialTodos}>It's a great day to get things done! Start by adding a task to your
            to-do list.</h2>
    {/each}

    <div class="mt-8">
        {#if newTaskMode}
            <div class="flex gap-3 items-center">
                <div class="flex flex-col gap-2 ">
                    <span class="text-sm font-bold text-lime-500">New Task:</span>
                    <div class="flex gap-3 flex-col md:flex-row">
                        <input use:newTodoFieldLoaded bind:value={newTodoValue} on:keydown={onEnterPress} type="text"
                               class="bg-lime-50 py-2 px-4 border-none focus:ring-lime-500 w-96 focus:ring-2 rounded-md shadow-md grow placeholder-gray-300"
                               placeholder="e.g. {sillyTodo}"/>
                        <button class="text-lg bg-lime-500 hover:bg-lime-700 py-1.5 px-4 rounded-lg shadow-md text-lime-50"
                                on:click={addNewTodo}>
                            Add
                        </button>
                        <button class="underline text-xs" on:click={() => {newTaskMode = false}}>close</button>
                    </div>
                </div>

            </div>
        {:else}
            <button class="text-md bg-lime-500 hover:bg-lime-700 py-2 px-4 rounded-lg shadow-md text-lime-50"
                    on:click={() => {newTaskMode = true; sillyTodo = randomSillyTodo();}}>
                + Add a new task
            </button>
        {/if}
    </div>

</div>