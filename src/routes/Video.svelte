<script lang="ts">
	import { PUBLIC_FS_URL } from '$env/static/public';

	export let videoName: string;

	const videoSrc = `${PUBLIC_FS_URL}/videos/${videoName}.mp4`;
</script>

<video autoplay loop muted>
	<source src={videoSrc} type="video/mp4" />
	Video element not supported :(
</video>
