<script lang="ts">
	import type { PageProps } from './$types';
	import ControlDropdown from './ControlDropdown.svelte';
	import ControlCard from './ControlCard.svelte';
	import { Label, Input } from 'flowbite-svelte';
	import { send_post } from '$lib/utils';

	let { data }: PageProps = $props();

	let videoIdx = $state(0);
	let shaderIdx = $state(0);
	let videoSpeed = $state(1.0);

	async function sendVideoConf() {
		const videoConf = {
			videoName: data.videoNames[videoIdx],
			shaderName: data.shaderNames[shaderIdx],
			speed: videoSpeed
		};
		await send_post('/api/sendVideoConf', videoConf);
	}
</script>

<div class="align-center flex flex-col p-4">
	<h1 class="mx-auto text-3xl text-white">Control Panel</h1>

	<ControlCard title="Video" onSubmit={sendVideoConf}>
		<ControlDropdown text="Select Video" collection={data.videoNames} bind:idx={videoIdx} />
		<ControlDropdown text="Select Shader" collection={data.shaderNames} bind:idx={shaderIdx} />
		<div class="flex w-28">
			<Label class="my-auto mr-2 text-white">Speed</Label>
			<Input id="x" size="sm" bind:value={videoSpeed} type="number" step="0.1" />
		</div>
	</ControlCard>
</div>
