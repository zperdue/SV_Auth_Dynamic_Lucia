<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

    import * as Form from "$lib/components/ui/form";

	//let { data }: { data: PageServerData } = $props();
    let { children } = $props();
</script>

<main class="flex flex-row h-screen">
    <section class='w-0 w-1/3 bg-blue-800 p-0 flex flex-col items-end justify-start p-4'>
        <a href="/private">Private::Home</a>
        <a href="/private/profile">Profile</a>
        <a href="/private/settings">Settings</a>

        <div class="">
            <form method="post" action="?/logout" use:enhance>
                <Form.Button class="w-full">
                    Sign Out
                </Form.Button>
            </form>
        </div>
    </section>

    <section class='flex items-center justify-center w-full ms:w-2/3 bg-gray-100 p-2.5'>

        

        <div class='w-1/2 max-w-sm'>
            {@render children()}
            <!--{@render children()}-->
        </div>
    </section>

</main>
