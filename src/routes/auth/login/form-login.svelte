<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Mail from "lucide-svelte/icons/mail";

    import { loginSchema, type LoginSchema } from "$lib/forms/schema/schema";


    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<LoginSchema>> } } = $props();
    
    const form  = superForm(data.form, {
        validators: zodClient(loginSchema),
    });

    const { form: formData, enhance, message } = form;
</script>

<form method="POST" use:enhance>

    {#if $message}
        <div class="text-red-600 text-sm mb-4">{$message}</div>
    {/if}

    <Form.Field {form} name="email">
        <Form.Control >
            {#snippet children({ props })}
                <!-- <Form.Label>Email</Form.Label> -->
                <Input type="email" {...props} bind:value={$formData.email} placeholder="Email Address" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="password">
        <Form.Control>
            {#snippet children({ props })}
                <!-- <Form.Label>Password</Form.Label> -->
                <Input type="password" {...props} bind:value={$formData.password} placeholder="Password" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Button class="w-full">
        <Mail class="mr-2 size-4" />
        Login with Email 
    </Form.Button>
</form>


