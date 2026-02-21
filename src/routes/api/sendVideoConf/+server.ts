import { PUBLIC_BRAIN_URL } from "$env/static/public";
import { send_post } from "$lib/utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json()
    await send_post(`${PUBLIC_BRAIN_URL}/general/configureVideo`, body)
    return json({})
}
