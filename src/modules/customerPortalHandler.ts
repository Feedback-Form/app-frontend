import axios from 'axios';
export function customerPortalHandler(token: string, stripeCustomerId: string): void {
	const req = {
		stripeCustomerId: stripeCustomerId,
	};

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	axios
		.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/customer-portal`, req, config)
		.then((res: any) => {
			window.location.href = res.data.url;
		})
		.catch((err: any) => {
			console.log('err', err);
		});
}
