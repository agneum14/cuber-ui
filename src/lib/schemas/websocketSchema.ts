import { z } from 'zod';

const VideoPayloadSchema = z.object({
	name: z.string()
});

const VideoSchema = z.object({
	tool: z.literal('video'),
	payload: VideoPayloadSchema
});

const ShaderPayloadSchema = z.object({
	name: z.string()
});

const ShaderSchema = z.object({
	tool: z.literal('shader'),
	payload: ShaderPayloadSchema
});

const VideoSpeedPayloadSchema = z.object({
	speed: z.number()
});

const VideoSpeedSchema = z.object({
	tool: z.literal('video_speed'),
	payload: VideoSpeedPayloadSchema
});

export const WebSocketMsgSchema = z.discriminatedUnion('tool', [
	VideoSchema,
	ShaderSchema,
	VideoSpeedSchema
]);
export type WebSocketMsg = z.infer<typeof WebSocketMsgSchema>;
