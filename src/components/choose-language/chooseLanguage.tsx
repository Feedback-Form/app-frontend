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
			<div className="flex flex-col w-3/4 h-1/5 justify-center max-w-screen-lg">
				<h1 className="flex justify-center md:justify-start tracking-wide text-3xl text-gray-900 font-medium md:pl-20">Choose language</h1>
			</div>

			<section className="flex justify-center md:justify-start w-3/4 h-4/5 overflow-y-auto pb-10 md:pl-20  max-w-screen-lg">
				<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-3 gap-4 w-3/4 md:w-full max-h-screen transition-all duration-150 ">
					{languages.map((item, index) => {
						return (
							<NavLink exact to={`/generate/${type}/${item.language}`} key={index}>
								<div
									key={index}
									className="flex flex-col justify-center space-y-1 lg:space-y-3 items-center rounded-lg py-2 md:py-6 px-2  h-36 lg:h-full  border-2 border-gray-100 hover:border-teal-700 duration-200 transition-all ease-in-out shadow-md"
								>
									<span
										role="image"
										aria-label={`${item.icon}`}
										className="font-emoji bg-teal-100 py-2 px-3 lg:py-2 lg:px-4 rounded-lg text-lg lg:text-2xl"
									>
										{item.icon}
									</span>
									<h1 className="text-gray-900 tracking-wide font-medium  text-sm lg:text-base 2xl:text-lg text-center capitalize">
										{item.language}
									</h1>
									{/* <p className="text-gray-700 text-center text-xs lg:text-sm 2xl:text-base">{item.description}</p> */}
								</div>
							</NavLink>
						);
					})}
				</div>
			</section>
		</section>
	);
};

export default ChooseLanguage;
