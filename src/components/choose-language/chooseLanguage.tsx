import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//hooks

const ChooseLanguage: FC = (): ReactElement => {
	const params = useParams<{ type: string }>();
	const { type } = params;
	const languages: Array<any> = [
		{
			language: 'english',
			icon: '🇺🇸/🇬🇧',
		},
		{
			language: 'german',
			icon: '🇩🇪',
		},
		{
			language: 'french',
			icon: '🇫🇷',
		},
		{
			language: 'italian',
			icon: '🇮🇹',
		},
		{
			language: 'spanish',
			icon: '🇪🇸',
		},
	];
	return (
		<section className="flex-shrink  flex flex-col items-center justify-center h-full w-full">
			<div className="flex flex-col w-3/4 h-1/5 justify-center">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
					Choose language
				</h1>
			</div>
			<div className="flex flex-col w-3/4 h-4/5 justify-start items-center space-y-10">
				{languages.map((item, index) => {
					return (
						<NavLink
							exact
							to={`/generate/${type}/${item.language}`}
							key={index}
						>
							<button
								className="w-64 md:w-80 py-6  bg-teal-700 rounded-lg text-white capitalize hover:bg-teal-600
									  transition-all ease-in-out duration-200 text-lg md:text-xl font-medium tracking-wide
									 focus:outline-none"
							>
								<p>
									<span className="pr-2 md:pr-4">{item.icon}</span>
									{item.language}
								</p>
							</button>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default ChooseLanguage;
