<script lang="ts">
	import Video from './Video.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_WS_URL } from '$env/static/public';
	import { WebSocketMsgSchema, type WebSocketMsg } from '$lib/schemas/websocketSchema';

	let videoName = 'anime_twerk';
	let shaderName = '';
	let socket: WebSocket;
	let reconnectAttempts = 0;

	function handleMsg(msg: WebSocketMsg) {
		console.log('handling', msg);
		if (msg.tool == 'video') {
			videoName = msg.payload.name;
		} else if (msg.tool == 'shader') {
			shaderName = msg.payload.name;
		}
	}

	function reconnectSocket() {
		if (!(socket.readyState in [WebSocket.OPEN, WebSocket.CONNECTING])) {
			const delay = Math.min(10000, 1000 * Math.pow(2, reconnectAttempts));
			console.log('reconnecting with delay', delay);
			reconnectAttempts++;
			setTimeout(connectSocket, delay);
		} else {
			console.log('skipping reconnect');
		}
	}

	function connectSocket() {
		socket = new WebSocket(PUBLIC_WS_URL);

		socket.onopen = () => {
			console.log('websocket connected');
			reconnectAttempts = 0;
		};
		socket.onclose = () => {
			console.log('websocket closed');
			reconnectSocket();
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const result = WebSocketMsgSchema.safeParse(data);
			if (result.success) {
				const msg: WebSocketMsg = result.data;
				handleMsg(msg);
			}
		};
	}

	onMount(() => {
		connectSocket();
	});
</script>

<Video {videoName} {shaderName} />
