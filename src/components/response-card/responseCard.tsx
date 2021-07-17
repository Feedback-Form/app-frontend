import React, { FC, ReactElement, useState, useEffect } from 'react';
import dateFormat from 'dateformat';

//interfaces
import { ResponseCardProps } from './responseCardProps';
const ResponseCard = ({
	createdAt,
	firstName,
	lastName,
	averageRating,
	maxRating,
	tags,
	clickHandlerFunction,
}: ResponseCardProps): ReactElement => {
	const [maxStars, setMaxStars] = useState<number[]>([1, 2, 3, 4, 5]);
	const [selectedStar, setSelectedStar] = useState<number>(3);
	// const [tags, setTags] = useState(['sleek design', 'good quality', 'affordable']);

	useEffect(() => {
		const newStars = [];
		for (let i = 0; i < maxRating; i++) {
			newStars.push(i);
		}
		setMaxStars(newStars);
	}, []);

	function getName(firstName: string, lastName: string): string {
		if (firstName === '' && lastName === '') {
			return 'Anonymous';
		}
		return `${firstName} ${lastName}`;
	}
	return (
		<div
			onClick={clickHandlerFunction}
			className="flex justify-between rounded-lg   p-7 space-x-10 border-2 border-gray-100 hover:border-primary-500 transition-all duration-100 ease-in-out cursor-pointer"
		>
			{/* left side */}
			<div className="flex flex-col justify-between space-y-4">
				<div>
					<h2 className="text-gray-900 font-semibold text-lg">{getName(firstName, lastName)}</h2>
				</div>

				<div className="flex flex-col">
					<span className="uppercase text-gray-400 font-medium text-sm pb-1">average rating</span>
					<div className="flex space-x-1">
						{maxStars.map((star, index) => (
							<svg
								key={index}
								xmlns="http://www.w3.org/2000/svg"
								className={`flex w-7 h-7 transition-all
                ${averageRating <= star ? 'text-gray-300' : 'text-gray-700'} `}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						))}
					</div>
				</div>
			</div>
			{/* right side */}
			<div className="flex flex-col justify-between space-y-3">
				<div className="flex flex-col items-end">
					<span className="text-gray-400 text-xs uppercase font-medium">submitted on</span>
					<span className="text-gray-700 font-medium text-sm">{dateFormat(createdAt, 'HH:MM tt, dS mmmm yy')}</span>
				</div>

				<div className="flex space-x-2 items-end">
					{tags.map((tag, index) => (
						<div key={index} className="bg-primary-500 uppercase text-white rounded-full px-2 py-1 text-xs w-44 text-center truncate">
							{tag}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default ResponseCard;
