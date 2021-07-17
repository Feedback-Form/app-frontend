import React, { ReactElement } from 'react';
import dateFormat from 'dateformat';
//interfaces
import { ResponseDetailCardProps } from './responseDetailCardProps';
import { QuestionResponse } from '../../interfaces/responseInterface';
const ResponseDetailsCard = ({
	closeCardHandlerFunction,
	personalDetails,
	allowPublishing,
	createdAt,
	questionResponses,
	aiSuggestions,
}: ResponseDetailCardProps): ReactElement => {
	function getName(firstName: string, lastName: string): string {
		if (firstName === '' && lastName === '') {
			return 'Anonymous';
		}
		return `${firstName} ${lastName}`;
	}

	function maxStars(maxRating: number): number[] {
		const stars = [];
		for (let i = 0; i < maxRating; i++) {
			stars.push(i + 1);
		}
		return stars;
	}
	return (
		<section className="absolute min-h-screen w-full ">
			<div className="absolute w-full h-full z-50">
				<div className="flex justify-center h-full w-full items-center">
					<div className="w-3/4 bg-white rounded-md px-10 py-8 space-y-6">
						<div className="flex justify-end">
							<svg
								onClick={closeCardHandlerFunction}
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-gray-400 cursor-pointer hover:text-gray-500 ease-in-out transition-all duration-100"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
						{/* SECTION 1 */}
						<div className="flex justify-between">
							<div className="flex flex-col justify-start space-y-2">
								<h2 className="text-gray-900 font-semibold text-lg">{getName(personalDetails.firstName, personalDetails.lastName)}</h2>
								<div className="flex space-x-2">
									<span className="text-gray-500">linkedIn</span>
									<span className="text-gray-800">{personalDetails.linkedInProfile}</span>
								</div>
							</div>

							<div className="flex flex-col justify-start space-y-2">
								<div>
									<span className="text-gray-400 text-xs uppercase font-medium">submitted on</span>
									<span className="text-gray-700 font-medium text-sm">{dateFormat(createdAt, 'HH:MM tt, dS mmmm yy')}</span>
								</div>
								<div
									className={`text-center ${
										allowPublishing ? 'text-green-700 bg-green-300' : 'text-red-700 bg-red-300'
									} tracking-wide uppercase font-medium text-sm`}
								>
									{allowPublishing ? 'publishing allowed' : 'publishing forbidden'}
								</div>
								<div
									className={`text-center ${
										aiSuggestions ? 'text-green-700 bg-green-300' : 'text-gray-700 bg-gray-300'
									} tracking-wide uppercase font-medium text-sm`}
								>
									{aiSuggestions ? 'AI enabled' : 'AI disabled'}
								</div>
							</div>
						</div>

						<div className="flex flex-col space-y-4">
							{questionResponses.map((response, index) => {
								return (
									<div key={index} className="flex flex-col space-y-2">
										<h3 className="text-xl text-gray-800 font-semibold capitalize ">
											{index + 1}. {response.question}
										</h3>
										<div className="flex space-x-1">
											{maxStars(response.maxRating).map((star, index) => {
												<svg
													key={index}
													xmlns="http://www.w3.org/2000/svg"
													className={`flex w-7 h-7 transition-all
									${response.rating <= star ? 'text-gray-300' : 'text-gray-700'} `}
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>;
											})}
										</div>
										<p className="tracking-wide text-gray-800 break-words">{response.response}</p>
										<div className="flex space-x-2 items-end">
											{response.tags.map((tag, index) => (
												<div key={index} className="bg-primary-500 uppercase text-white rounded-full px-2 py-1 text-xs  text-center ">
													{tag}
												</div>
											))}
										</div>
									</div>
								);
							})}
						</div>

						{/* questions, answers, stars & tags */}
					</div>
				</div>
			</div>

			<div className="absolute w-full min-h-screen bg-gray-300 z-0 opacity-50"></div>
		</section>
	);
};

export default ResponseDetailsCard;
