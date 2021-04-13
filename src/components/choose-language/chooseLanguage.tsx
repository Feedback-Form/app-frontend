import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
//hooks

const ChooseLanguage: FC = (): ReactElement => {
	const params = useParams<{ type: string }>();
	const { type } = params;
	const history = useHistory();
	const languages: Array<{ language: string; param: string; icon: string }> = [
		{
			language: 'english US',
			param: 'en-us',
			icon: '🇺🇸',
		},
		{
			language: 'english UK',
			param: 'en-gb',
			icon: '🇬🇧',
		},
		{
			language: 'german',
			param: 'de',
			icon: '🇩🇪',
		},
		{
			language: 'french',
			param: 'fr',
			icon: '🇫🇷',
		},
		{
			language: 'italian',
			param: 'it',
			icon: '🇮🇹',
		},
		{
			language: 'spanish',
			param: 'es',
			icon: '🇪🇸',
		},
		{
			language: 'portuguese',
			param: 'pt',
			icon: '🇵🇹',
		},
		{
			language: 'chinese',
			param: 'zh',
			icon: '🇨🇳',
		},
		{
			language: 'russian',
			param: 'ru',
			icon: '🇷🇺',
		},
		{
			language: 'swedish',
			param: 'sv',
			icon: '🇸🇪',
		},
		{
			language: 'japanese',
			param: 'ja',
			icon: '🇯🇵',
		},
		{
			language: 'czech',
			param: 'cs',
			icon: '🇨🇿',
		},
		{
			language: 'danish',
			param: 'da',
			icon: '🇩🇰',
		},
		{
			language: 'finnish',
			param: 'fi',
			icon: '🇫🇮',
		},
	];
	return (
		<section className="flex-shrink flex flex-col items-center justify-center space-y-10 w-full overflow-y-scroll">
			<div className="flex flex-col w-3/4 h-1/5 justify-center max-w-screen-lg pt-24">
				<div className="flex items-center md:pl-20 justify-center md:justify-start space-x-6">
					<span
						onClick={() => {
							history.push('/generate');
						}}
						className="p-2 bg-gray-100 hover:bg-teal-50 rounded-lg text-gray-600 hover:text-teal-700 cursor-pointer transition-all duration-200 ease-in-out"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7 text-current  "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
						</svg>
					</span>
					<h1 className=" tracking-wide text-3xl text-gray-900 font-medium ">Choose language</h1>
				</div>
			</div>

			<section className="flex justify-center md:justify-start w-3/4  h-4/5 pb-10 md:pl-20  max-w-screen-lg">
				<div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4  lg:grid-rows-6  gap-4 w-3/4 md:w-full h-screen transition-all duration-150 ">
					{languages.map((item, index) => {
						return (
							<NavLink exact to={`/generate/${type}/${item.param}`} key={index}>
								<div
									key={index}
									className="flex flex-col justify-center space-y-1 lg:space-y-3 items-center rounded-lg py-2 md:py-6 px-2 h-full border-2 border-gray-100 hover:border-teal-700 duration-200 transition-all ease-in-out shadow-md"
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
