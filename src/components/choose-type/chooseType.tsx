import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const ChooseType: FC = (): ReactElement => {
	const types: Array<{ title: string; description: string; route: string; icon: string }> = [
		{
			title: 'Google Ad Headlines',
			description: 'Write the headline for your PPC Ad on Google.',
			route: 'googleadheadlines',
			icon: '💸',
		},
		{
			title: 'Google Ad Descriptions',
			description: 'Write a compelling description of your ad for Google Adwords.',
			route: 'googleaddescriptions',
			icon: '🦄',
		},
		{
			title: 'Facebook Ad Headlines',
			description: 'Write Facebook ad headlines that fit the theme of your ad.',
			route: 'facebookheadlines',
			icon: '💥',
		},
		{
			title: 'Value Propositions',
			description: `Write out your product's purpose and value to your customers.`,
			route: 'valuepropositions',
			icon: '✨',
		},
		{
			title: 'Slogans',
			description: `Create the perfect slogan for your company or brand.`,
			route: 'slogans',
			icon: '📣',
		},
		{
			title: 'Product Descriptions',
			description: 'Create better product descriptions for your ecommerce store.',
			route: 'productdescriptions',
			icon: '🎯',
		},
		{
			title: 'Product Names',
			description: 'Give your ecommerce product a name.',
			route: 'productnames',
			icon: '🎉',
		},
		{
			title: 'Taglines',
			description: 'Pitch your product in 4-7 words.',
			route: 'taglines',
			icon: '💭',
		},
		{
			title: 'Article Headlines',
			description: 'Take an article you may have written and use it to translate the content into a headline.',
			route: 'articleheadlines',
			icon: '💯',
		},
		{
			title: 'Article Ideas',
			description: 'Get some inspiration for your next article.',
			route: 'articleideas',
			icon: '💡',
		},
	];

	return (
		<section className="flex-shrink flex flex-col items-center justify-center  h-full w-full">
			<div className="flex flex-col w-3/4 h-1/5 justify-center  max-w-screen-lg">
				<h1 className="flex justify-center md:justify-start tracking-wide text-3xl text-gray-900 font-medium md:pl-20 ">
					Choose content type
				</h1>
			</div>
			<section className="flex justify-center md:justify-start w-3/4 h-4/5 overflow-y-auto pb-10 md:pl-20  max-w-screen-lg">
				<div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-3 gap-4 w-3/4 md:w-full h-screen transition-all duration-150 ">
					{types.map((item, index) => {
						return (
							<NavLink exact to={`/generate/${item.route}`} key={index}>
								<div
									key={index}
									className="flex flex-col justify-center space-y-1 lg:space-y-3 items-center rounded-lg py-2 md:py-6 px-2  h-36 lg:h-full  border-2 border-gray-100 hover:border-teal-700 duration-200 transition-all ease-in-out shadow-md"
								>
									<span
										role="image"
										aria-label={`${item.icon}`}
										className="font-emoji bg-teal-100 py-2 px-3 lg:py-2 lg:px-4 rounded-lg text-base lg:text-lg 2xl:text-xl"
									>
										{item.icon}
									</span>
									<h1 className="text-gray-900 tracking-wide font-medium  text-sm lg:text-base 2xl:text-lg text-center">{item.title}</h1>
									<p className="text-gray-700 text-center text-xs lg:text-sm 2xl:text-base">{item.description}</p>
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
