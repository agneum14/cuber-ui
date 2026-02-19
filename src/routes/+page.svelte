<script lang="ts">
	import Video from './Video.svelte';

	let videoName = 'anime_twerk';
	let shaderName = '';

	let newVideoName = '';
	let newShaderName = '';
	function handleVideo() {
		videoName = newVideoName;
	}
	function handleShader() {
		shaderName = newShaderName;
	}
</script>

<form on:submit={handleVideo}>
	<input type="text" bind:value={newVideoName} />
	<button type="submit">Submit</button>
</form>
<form on:submit={handleShader}>
	<input type="text" bind:value={newShaderName} />
	<button type="submit">Submit</button>
</form>
<Video {videoName} {shaderName} />
