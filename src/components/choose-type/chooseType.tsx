import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import googleIcon from '../../images/google-icon.png';
import facebookIcon from '../../images/fb-icon.svg';
const ChooseType: FC = (): ReactElement => {
	const types: Array<{ title: string; description: string; route: string; icon: string }> = [
		{
			title: 'Google Ad Headlines',
			description: 'Write the headline for your PPC Ad on Google.',
			route: 'googleadheadlines',
			icon: 'google',
		},
		{
			title: 'Google Ad Descriptions',
			description: 'Write a compelling description of your ad for Google Adwords.',
			route: 'googleaddescriptions',
			icon: 'google',
		},
		{
			title: 'Facebook Ad Headlines',
			description: 'Write Facebook ad headlines that fit the theme of your ad.',
			route: 'facebookheadlines',
			icon: 'facebook',
		},
		{
			title: 'Facebook Ad Primary',
			description: 'Write Facebook ad primary texts that fit the theme of your ad.',
			route: 'facebookprimary',
			icon: 'facebook',
		},
		{
			title: 'Facebook Ad Link Descriptions',
			description: 'Write Facebook ad link descriptions that fit the theme of your URL.',
			route: 'facebooklinkdescription',
			icon: 'facebook',
		},
		{
			title: 'Value Propositions',
			description: `Write out your product's purpose and value to your customers.`,
			route: 'valuepropositions',
			icon: 'valuepropositions',
		},
		{
			title: 'Slogans',
			description: `Create the perfect slogan for your company or brand.`,
			route: 'slogans',
			icon: 'slogans',
		},
		{
			title: 'Product Descriptions',
			description: 'Create better product descriptions for your ecommerce store.',
			route: 'productdescriptions',
			icon: 'productdescriptions',
		},
		{
			title: 'Product Names',
			description: 'Give your ecommerce product a name.',
			route: 'productnames',
			icon: 'productnames',
		},
		{
			title: 'Taglines',
			description: 'Pitch your product in 4-7 words.',
			route: 'taglines',
			icon: 'taglines',
		},
		{
			title: 'Blog Headlines',
			description: 'Take an article you may have written and use it to translate the content into a headline.',
			route: 'blogheadlines',
			icon: 'blogheadlines',
		},
		{
			title: 'Blog Ideas',
			description: 'Get some inspiration for your next article.',
			route: 'blogideas',
			icon: 'blogideas',
		},
		{
			title: 'A Blog Intro',
			description: 'Get an up to 400 characters long intro for your blog idea.',
			route: 'blogintro',
			icon: 'blogintro',
		},
	];

	function showFeatureIcon(icon: string): JSX.Element {
		switch (icon) {
			case 'google':
				return <img src={googleIcon} alt="google icon" className="w-14 p-3 bg-teal-100 rounded-lg"></img>;

			case 'facebook':
				return <img src={facebookIcon} alt="facebook icon" className="w-14 p-3 bg-teal-100 rounded-lg"></img>;

			case 'blogintro':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</span>
				);
			case 'blogideas':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
					</span>
				);

			case 'blogheadlines':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
							/>
						</svg>
					</span>
				);
			case 'taglines':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
							/>
						</svg>
					</span>
				);
			case 'productnames':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
							/>
						</svg>
					</span>
				);
			case 'productdescriptions':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
							/>
						</svg>
					</span>
				);

			case 'slogans':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
					</span>
				);

			case 'valuepropositions':
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7  stroke-current "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
							/>
						</svg>
					</span>
				);

			default:
				return (
					<span className="text-teal-700  p-3  bg-teal-100 rounded-lg ">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</span>
				);
		}
	}

	return (
		<section className="flex-shrink flex flex-col items-center justify-center space-y-10 w-full overflow-y-scroll">
			<div className="flex flex-col w-3/4 h-1/5 justify-center  max-w-screen-lg pt-24 ">
				<h1 className="flex justify-center md:justify-start tracking-wide text-3xl text-gray-900 font-medium md:pl-20 ">
					Choose content type
				</h1>
			</div>
			<section className="flex justify-center md:justify-start w-3/4  h-4/5 pb-10 md:pl-20  max-w-screen-lg">
				<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-5 gap-4 w-full transition-all duration-150 ">
					{types.map((item, index) => {
						const { route, icon, title, description } = item;
						return (
							<NavLink exact to={`/generate/${route}`} key={index}>
								<div
									key={index}
									className="flex flex-col justify-center space-y-1 lg:space-y-3 items-center rounded-lg py-2 md:py-6 px-2 h-full border-2 border-gray-100 hover:border-teal-700 duration-200 transition-all ease-in-out shadow-md"
								>
									{showFeatureIcon(icon)}
									<h1 className="text-gray-900 tracking-wide font-medium  text-sm lg:text-base 2xl:text-lg text-center">{title}</h1>
									<p className="text-gray-700 text-center text-xs lg:text-sm 2xl:text-base">{description}</p>
								</div>
							</NavLink>
						);
					})}
				</div>
			</section>
		</section>
	);
};

export default ChooseType;
