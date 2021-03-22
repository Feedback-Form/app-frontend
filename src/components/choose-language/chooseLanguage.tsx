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
		<section className="flex-shrink  flex flex-col items-center justify-center h-3/4 w-full space-y-10">
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
					Choose language
				</h1>
			</div>
			<div className="flex w-3/4 h-3/4 justify-evenly items-center space-x-10">
				{languages.map((item, index) => {
					return (
						<NavLink
							exact
							to={`/generate/${type}/${item.language}`}
							key={index}
						>
							<button
								className="p-10 lg:p-16 bg-gray-200 rounded-md capitalize hover:bg-teal-700
							 			hover:text-teal-50 transition-all ease-in-out duration-20 text-xl font-medium tracking-wide
										 focus:outline-none"
							>
								<p>
									<span className="md:pr-4">{item.icon}</span>
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
