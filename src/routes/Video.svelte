<script lang="ts">
	import { PUBLIC_FS_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';

	let { videoName, shaderName, videoSpeed } = $props();

	let app: PIXI.Application;
	let videoElement: HTMLVideoElement;
	let videoSprite: PIXI.Sprite;

	$effect(() => {
		configureVideo(videoName);
	});
	$effect(() => {
		applyFragmentShader(shaderName);
	});
	$effect(() => {
		let _ = videoSpeed;
		if (videoElement) {
			videoElement.playbackRate = videoSpeed;
		}
	});

	function applyFragmentShader(name: string) {
		if (!videoSprite) {
			return;
		}
		if (!shaderName) {
			videoSprite.filters = [];
			return;
		}
		const vertex = `
            in vec2 aPosition;
            out vec2 vTextureCoord;

            uniform vec4 uInputSize;
            uniform vec4 uOutputFrame;
            uniform vec4 uOutputTexture;

            vec4 filterVertexPosition(void)
            {
                vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
                position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
                position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
                return vec4(position, 0.0, 1.0);
            }

            vec2 filterTextureCoord(void)
            {
                return aPosition * (uOutputFrame.zw * uInputSize.zw);
            }

            void main(void)
            {
                gl_Position = filterVertexPosition();
                vTextureCoord = filterTextureCoord();
            }
        `;
		const shaderUrl = `${PUBLIC_FS_URL}/shaders/${name}.frag`;
		fetch(shaderUrl)
			.then((res) => res.text())
			.then((fragment) => {
				const filter = PIXI.Filter.from({
					gl: {
						fragment,
						vertex
					},
					resources: {
						timeUniforms: {
							uTime: { value: 0.0, type: 'f32' }
						},
						resolutionUniforms: {
							uResolution: { value: [app.renderer.width, app.renderer.height], type: 'vec2<f32>' }
						}
					}
				});
				videoSprite.filters = [filter];
				app.ticker.add((ticker) => {
					filter.resources.timeUniforms.uniforms.uTime += 0.04 * ticker.deltaTime;
				});
			});
	}

	function configureVideo(name: string) {
		if (!videoElement) {
			return;
		}
		videoElement.src = `${PUBLIC_FS_URL}/videos/${name}.mp4`;
		videoElement.onloadeddata = async () => {
			if (videoSprite.texture) {
				videoSprite.texture.destroy();
			}
			let videoTexture = PIXI.Texture.from(videoElement);
			videoSprite.texture = videoTexture;
			const scale = Math.max(
				app.canvas.width / videoElement.videoWidth,
				app.canvas.height / videoElement.videoHeight
			);
			videoSprite.scale.set(scale);
			videoSprite.x = (app.canvas.width - videoSprite.width) / 2;
			videoSprite.y = (app.canvas.height - videoSprite.height) / 2;
			app.ticker.add(() => {
				videoTexture.update();
			});
		};
	}

	onMount(async () => {
		app = new PIXI.Application();
		await app.init({ width: window.innerWidth, height: window.innerHeight });
		const vidContainer = document.getElementById('vidContainer')!;
		vidContainer.appendChild(app.canvas);
		videoElement = document.createElement('video');
		videoElement.autoplay = true;
		videoElement.muted = true;
		videoElement.loop = true;
		videoElement.crossOrigin = 'anonymous';
		videoSprite = new PIXI.Sprite();
		app.stage.addChild(videoSprite);
		configureVideo(videoName);
		applyFragmentShader(shaderName);
	});
</script>

<div id="vidContainer"></div>
