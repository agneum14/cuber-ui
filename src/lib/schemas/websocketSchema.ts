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

export const WebSocketMsgSchema = z.discriminatedUnion('tool', [VideoSchema, ShaderSchema]);
export type WebSocketMsg = z.infer<typeof WebSocketMsgSchema>;
