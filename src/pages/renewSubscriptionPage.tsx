import React, { FC, ReactElement, useState, useEffect } from 'react';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

const RenewSubscriptionPage: FC = (): ReactElement => {
	const { token, userObject } = useUserData();

	return (
		<section className="h-screen w-full flex flex-col font-scrptai overflow-y-auto bg-gray-50 justify-center">
			<div className="text-center space-y-16 ">
				<div className="space-y-8 ">
					<h1 className="font-semibold text-teal-700 text-4xl">Your subscription has ended.</h1>

					<div className="flex justify-center">
						<p className="font-base text-gray-700 text-xl md:w-1/2 max-w-2xl">Resume access access for CopykatAI by upgrading your plan.</p>
					</div>

					<p className="font-base text-gray-700 text-xl ">
						Questions? Reach out to
						<a
							className="text-teal-700 hover:text-teal-600 ease-in-out duration-200 transition-all pl-1"
							href={`mailto:${process.env.REACT_APP_MAILTO}`}
						>
							{``}
							{process.env.REACT_APP_MAILTO}
						</a>
					</p>
				</div>
				<button className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-lg px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50">
					Update your payment information now.
				</button>
			</div>
		</section>
	);
};

export default RenewSubscriptionPage;
