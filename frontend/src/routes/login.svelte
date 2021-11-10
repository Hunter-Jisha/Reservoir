<script>
    import Logo from "../lib/Logo.svelte"
    import { slide, fade, draw } from 'svelte/transition';
    import { goto } from '$app/navigation';

    var mode = null

    var email, password, repeatPassword, registerError, loginError

    async function login()
    {
        const data = await (await fetch("/backend", 
        {
            method: "POST",
            body: `
            {
                login(email: "${email}", password: "${password}")
                {
                    success
                    sessionId
                }
            }`
        })).json()

        if(data.data.login.success)
        {
            console.log(data.data.login.sessionId)
            window.localStorage.setItem("sessionId", data.data.login.sessionId)
            goto("/home")
        }
        else
        {
            loginError = "Invalid Login"
            mode = "login"
        }
    }

    async function register()
    {
        const data = await (await fetch("/backend", 
        {
            method: "POST",
            body: `
            {
                register(email: "${email}", password: "${password}")
                {
                    success
                    message
                }
            }`
        })).json()

        if(data.data.register.success)
        {
            login()
        }
        else
        {
            registerError = data.data.register.message
            mode = "register"
        }
    }
</script>

<!--Container-->
<div class="w-full h-full relative ">
    <!--Cover-->
    {#if mode === null}
    <div class="absolute top-0 left-0 w-full h-max bg-white flex flex-col p-10 items-center justify-center text-center gap-3"
    in:slide out:fade>
        <Logo style="w-3/4 text-blue-500"/>
        
        <h1 class="text-blue-500 font-bold text-3xl">Get Started</h1>

        <p class="text-gray-400">Login or Register to start tracking your devices right now!</p>

        <button class="w-full h-10 border-blue-500 border-2 rounded-lg text-blue-500 font-bold hover:bg-blue-500 hover:text-white"
        on:click="{() => mode = "login"}"
        >Login</button>
        <button class="w-full h-10 bg-blue-500 border-blue-500 border-2 rounded-lg text-white font-bold hover:bg-white hover:text-blue-500"
        on:click="{() => mode = "register"}">Register</button>
    </div>
    {/if}

    <!--Login-->
    {#if mode === "login"}
        <div class="flex absolute top-0 left-0 w-full h-max flex-col items-center p-10 gap-4"
        in:slide out:fade>
            <p class="text-blue-500 font-bold text-2xl">Login</p>


            {#if loginError}
                <div class="p-2 rounded-lg bg-red-200 text-red-400 flex flex-row gap-2">
                    <svg class="h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor" />
                        <path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z" fill="currentColor" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z" fill="currentColor" />
                    </svg>

                    <p>{loginError}</p>
                </div>
            {/if}

            <!--Login Container-->
            <div class="flex flex-col gap-4">
                <!--Email Container-->
                <div class="flex flex-col gap-1">
                    <p class="text-gray-600 text-md">Email</p>
                    <input bind:value="{email}" type="email" placeholder="user@example.com"
                    class="w-max rounded-md bg-gray-100 border-2 border-gray-300 h-8 px-2 box-content focus:border-blue-500 text-gray-600">
                </div>

                <!--Password Container-->
                <div class="flex flex-col gap-1">
                    <p class="text-gray-600 text-md">Password</p>
                    <input bind:value="{password}" type="password" placeholder="••••••••"
                    class="w-max rounded-md bg-gray-100 border-2 border-gray-300 h-8 px-2 box-content focus:border-blue-500 text-gray-600">
                </div>

                <button class="w-full bg-blue-500 h-10 rounded-md text-white font-bold text-md"
                on:click="{() => {mode = "loading"; login()}}">Login</button>
            </div>

            <p class="text-gray-400 text-center">
                Actually, I'd like to 
                <span class="font-bold text-blue-500 hover:cursor-pointer"
                on:click="{() => mode = "register"}">Register</span>
            </p>
        </div>
    {/if}

    <!--Register-->
    {#if mode === "register"}
        <div class="flex absolute top-0 left-0 w-full h-max flex-col items-center p-10 gap-4"
        in:slide out:fade>
            <p class="text-blue-500 font-bold text-2xl">Register</p>

            {#if registerError}
                <div class="p-2 rounded-lg bg-red-200 text-red-400 flex flex-row gap-2">
                    <svg class="h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor" />
                        <path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z" fill="currentColor" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z" fill="currentColor" />
                    </svg>

                    <p>{registerError}</p>
                </div>
            {/if}


            <!--Register Container-->
            <div class="flex flex-col gap-4 w-full items-center px-4">
                <!--Email Container-->
                <div class="flex flex-col gap-1">
                    <p class="text-gray-600 text-md">Email</p>
                    <input bind:value="{email}" type="email" placeholder="user@example.com"
                    class="w-max rounded-md bg-gray-100 border-2 border-gray-300 h-8 px-2 box-content focus:border-blue-500 text-gray-600">
                </div>

                <!--Password Container-->
                <div class="flex flex-col gap-1">
                    <p class="text-gray-600 text-md">Password</p>
                    <input bind:value="{password}" type="password" placeholder="••••••••"
                    class="{password !== repeatPassword ? "border-red-400" : ""} w-max rounded-md bg-gray-100 border-2 border-gray-300 h-8 px-2 box-content focus:border-blue-500 text-gray-600">
                </div>

                <!--Repeat Password Container-->
                <div class="flex flex-col gap-1">
                    <p class="text-gray-600 text-md">Repeat Password</p>
                    <input bind:value="{repeatPassword}" type="password" placeholder="••••••••"
                    class="{password !== repeatPassword ? "border-red-400" : ""} w-max rounded-md bg-gray-100 border-2 border-gray-300 h-8 px-2 box-content focus:border-blue-500 text-gray-600">
                </div>

                <button class="w-full bg-blue-500 h-10 rounded-md text-white font-bold text-md"
                on:click="{() => {mode = "loading"; register()}}">Register</button>

                <p class="text-gray-400 text-center">
                    Actually, I'd like to 
                    <span class="font-bold text-blue-500 hover:cursor-pointer"
                    on:click="{() => mode = "login"}">Login</span>
                </p>
            </div>
        </div>
    {/if}

    <!--Loading-->
    {#if mode === "loading"}
        <svg viewBox="0 0 24 24" class="p-16 w-full absolute top-8 text-blue-500">
            <path in:draw="{{duration: 1500}}" d="M2 6 L12 2 L22 6 L22 18 L12 22 L2 18 L2 6 L12 10 L22 6 M12 10 L12 22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path in:fade="{{delay: 1000}}" d="M2 6 L12 10 L12 22 L2 18 M12 10 L22 6 L22 18 L12 22" fill="currentColor" stroke="none"/>
        </svg>
    {/if}
</div>
