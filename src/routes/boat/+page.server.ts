import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	const boatName = cookies.get('boatName');
	return {
		boatName
	};
}) satisfies PageServerLoad;

export const actions = {
	rename: async ({ request, cookies }) => {
		const formData = await request.formData();
		const boatName = formData.get('boatName') as string;

		cookies.set('boatName', boatName);
	},
	capitalize: async ({ cookies }) => {
		const boatName = cookies.get('boatName') as string;
		cookies.set('boatName', boatName?.toUpperCase());
	}
} satisfies Actions;
