import React, { FC, ReactElement, useState, useEffect } from 'react';
import axios from 'axios';

//hooks
import { useUserData } from '../hooks/contexts/userContext';

//components
import ResponseWidget from '../components/response-widget/responseWidget';
import LoadingWidget from '../components/loadingWidget';

//modules
import { checkoutHandler } from '../modules/checkoutHandler';

const TrialEndedPage: FC = (): ReactElement => {
	const { token } = useUserData();
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [resMessage, setResMessage] = useState('');
	const [showResWidget, setShowResWidget] = useState(false);

	return (
		<>
			{showResWidget && (
				<ResponseWidget success={isSuccess} response={resMessage} />
			)}
			{isLoading && <LoadingWidget />}
			<section className="h-screen w-full flex flex-col font-scrptai overflow-y-auto bg-gray-50 justify-center">
				<div className="text-center space-y-16 ">
					<div className="space-y-8 ">
						<h1 className="font-semibold text-teal-700 text-4xl">
							You&apos;ve used up all your free sessions.
						</h1>

						<div className="flex justify-center">
							<p className="font-base text-gray-700 text-xl md:w-1/2 max-w-2xl">
								Resume access access for CopykatAI by upgrading your plan.
							</p>
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
					<button
						onClick={() => {
							checkoutHandler();
						}}
						className="bg-teal-700 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none text-white rounded-lg px-16 py-2 font-medium tracking-wide text-lg transition-all ease-in-out duration-200 disabled:opacity-50"
					>
						Upgrade now
					</button>
				</div>
			</section>
		</>
	);
};

export default TrialEndedPage;
