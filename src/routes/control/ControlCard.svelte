<script lang="ts">
	import { Button } from 'flowbite-svelte';
	export let title: string;
	export let onSubmit: () => void;
</script>

<div class="flex">
	<div class="m-4 mx-auto flex w-96 flex-col gap-2 bg-neutral-800 p-2 outline-2 outline-purple-500">
		<h2 class="text-xl text-white">{title}</h2>
		<slot />
		<div class="flex">
			<Button outline color="purple" class="ml-auto w-24 focus:ring-0" onclick={onSubmit}
				>Submit</Button
			>
		</div>
	</div>
</div>
