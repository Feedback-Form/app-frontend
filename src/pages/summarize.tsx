import React, { FC, ReactElement } from 'react';

import Sidebar from '../components/sidebar';
import Summarize from '../components/main/summarize';

import { useUserData } from '../hooks/userContext';

const SummarizePage: FC = (): ReactElement => {
	const { userPlan } = useUserData();

	console.log('userDataContext:', {
		plan: userPlan,
	});
	return (
		<section className="h-screen w-full flex overflow-hidden font-scrptai">
			<Sidebar />
			<Summarize />
			{/* <main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-center space-y-1 ">
				<Documents />
			</main> */}
		</section>
	);
};

export default SummarizePage;
