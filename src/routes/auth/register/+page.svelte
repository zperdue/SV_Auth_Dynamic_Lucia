<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js"
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageData } from "./$types.js";
    import RegisterForm from "./form-register.svelte";
    import Chrome from "lucide-svelte/icons/chrome";

    let { data }: { data: PageData } = $props();
</script>


<Card.Root class="">
    <Card.Header>
        <Card.Title class="text-2xl font-semibold">Register.</Card.Title>
        <Card.Description class="">Create an account below to get started.</Card.Description>
    </Card.Header>
    <Card.CardContent>

        <RegisterForm  {data} />

        <div class="relative mb-4 mt-4">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs">
                <span class="bg-background px-2 text-muted-foreground">Or</span>
            </div>
        </div>

        <Button href="./google" class="w-full">
            <Chrome class="mr-2 size-4" />
            Continue with Google
        </Button>

        <div class="relative mt-8">
            <div class="relative flex text-xs bg-background px-2 text-muted-foreground">
                Already have an account?
                <a class="ml-2 underline underline-offset-4 hover:text-primary" href="./login">Login</a>
            </div>
        </div>

    </Card.CardContent>
</Card.Root>
