<script lang="ts">
	import Video from './Video.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_WS_URL } from '$env/static/public';
	import { WebSocketMsgSchema, type WebSocketMsg } from '$lib/schemas/websocketSchema';

	let videoName = 'anime_twerk';
	let shaderName = '';

	function handleMsg(msg: WebSocketMsg) {
		console.log('handling', msg);
		if (msg.tool == 'video') {
			videoName = msg.payload.name;
		} else if (msg.tool == 'shader') {
			shaderName = msg.payload.name;
		}
	}

	onMount(() => {
		const socket = new WebSocket(PUBLIC_WS_URL);

		socket.onopen = () => {
			console.log('websocket connected');
		};
		socket.onclose = () => {
			console.log('websocket closed');
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const result = WebSocketMsgSchema.safeParse(data);
			if (result.success) {
				const msg: WebSocketMsg = result.data;
				handleMsg(msg);
			}
		};
	});
</script>

<Video {videoName} {shaderName} />
