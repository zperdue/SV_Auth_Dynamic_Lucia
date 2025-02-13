<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Mail from "lucide-svelte/icons/mail";

    import { registerSchema, type RegisterSchema } from "$lib/forms/schema/schema";

    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<RegisterSchema>> } } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(registerSchema),
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
<!--
    <Form.Field {form} name="name">
        <Form.Control >
            {#snippet children({ props })}
                <Form.Label>Full Name</Form.Label>
                <Input type="text" {...props} bind:value={$formData.name} placeholder="Full Name" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
-->
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

    <Form.Field {form} name="confirmPassword">
        <Form.Control>
            {#snippet children({ props })}
                <!-- <Form.Label>Confirm Password</Form.Label> -->
                <Input type="password" {...props} bind:value={$formData.confirmPassword} placeholder="Confirm Password" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
<!--
    <Form.Field {form} name="tos">
        <Form.Control>
            {#snippet children({ props })}
                <Checkbox {...props} />
                <Form.Label>Accept terms and conditions</Form.Label>              
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="remember">
        <Form.Control>
            {#snippet children({ props })}
                <Checkbox {...props} />
                <Form.Label>Remember me on this device</Form.Label>              
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
-->
    <Form.Button class="w-full">
        <Mail class="mr-2 size-4" />
        Register with Email 
    </Form.Button>
</form>


