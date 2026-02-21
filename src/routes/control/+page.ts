import { PUBLIC_BRAIN_URL } from '$env/static/public';
import z from 'zod';
import type { PageLoad } from './$types';

const StringArraySchema = z.array(z.string());

export const load: PageLoad = async ({ fetch }) => {
    async function getNames(url: string): Promise<string[]> {
        return fetch(url)
            .then((res) => res.json())
            .then((data) => StringArraySchema.parse(data))
            .catch((e) => {
                console.log('error retrieving names', e);
                return [];
            });
    }

	let videoNames = await getNames(`${PUBLIC_BRAIN_URL}/general/availableVideos`);
	let shaderNames = await getNames(`${PUBLIC_BRAIN_URL}/general/availableShaders`);

	return {
		videoNames,
		shaderNames
	};
};
