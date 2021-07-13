import React, { FC, ReactElement, useState } from 'react';
import LoadingWidget from '../components/loadingWidget';
//services
import { getFormById, rateForm } from '../services/appService';

//interfaces
import { ResponseSuggestionRequest } from '../interfaces/responseBodyInterface';
const RatingPage: FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRequestLoading, setIsRequestLoading] = useState(false);
	return (
		<>
			<section className="w-full min-h-screen flex flex-col bg-white text-gray-900 items-center">
				{isRequestLoading && <LoadingWidget />}
				{isLoading ? (
					<h1>fetching</h1>
				) : (
					<>
						<main className="flex flex-col w-3/4 max-w-xl flex-grow">
							<div></div>
						</main>
					</>
				)}
			</section>
		</>
	);
};
export default RatingPage;
