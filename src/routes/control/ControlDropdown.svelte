<script lang="ts">
	import { Select, Label } from 'flowbite-svelte';

	export let text: string;
	export let collection: string[];
	export let idx: number;

	let selections = collection.map((x, i) => ({ name: x, value: i }));
</script>

<Label class="text-white"
	>{text}
	<Select items={selections} bind:value={idx} />
</Label>
