import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const ChooseType: FC = (): ReactElement => {
	const types: Array<{ text: string; description: string; route: string; icon: string }> = [
		{
			text: 'Google Ad Headlines',
			description: 'Write the headline for your PPC Ad on Google.',
			route: 'googleadheadlines',
			icon: '💸',
		},
		{
			text: 'Google Ad Descriptions',
			description: 'Write a compelling description of your ad for Google Adwords.',
			route: 'googleaddescriptions',
			icon: '🦄',
		},
		{
			text: 'Facebook Ad Headlines',
			description: 'Write Facebook ad headlines that fit the theme of your ad.',
			route: 'facebookheadlines',
			icon: '💥',
		},
		{
			text: 'Value Propositions',
			description: `Write out your product's purpose and value to your customers.`,
			route: 'valuepropositions',
			icon: '✨',
		},
		{
			text: 'Slogans',
			description: `Create the perfect slogan for your company or brand.`,
			route: 'slogans',
			icon: '📣',
		},
		{
			text: 'Product Descriptions',
			description: 'Create better product descriptions for your ecommerce store.',
			route: 'productdescriptions',
			icon: '🎯',
		},
		{
			text: 'Product Names',
			description: 'Give your ecommerce product a name.',
			route: 'productnames',
			icon: '🎉',
		},
		{
			text: 'Taglines',
			description: 'Pitch your product in 4-7 words.',
			route: 'taglines',
			icon: '💭',
		},
		{
			text: 'Article Headlines',
			description: 'Take an article you may have written and use it to translate the content into a headline.',
			route: 'articleheadlines',
			icon: '💯',
		},
		{
			text: 'Article Ideas',
			description: 'Use your core message and blog to expand on your content.',
			route: 'articleideas',
			icon: '💡',
		},
	];

	return (
		<section className="flex-shrink flex flex-col items-center justify-center  h-full w-full">
			<div className="flex flex-col w-3/4 h-1/5 justify-center  max-w-screen-lg">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium md:pl-20">Choose content type</h1>
			</div>
			<div className="flex md:grid flex-col md:space-y-0 w-3/4  md:grid-cols-3 md:grid-rows-3 md:gap-4  max-w-screen-md xl:max-w-screen-lg overflow-y-auto">
				{types.map((item, index) => {
					return (
						<NavLink exact to={`/generate/${item.route}`} key={index}>
							<div
								key={index}
								className="flex flex-col space-y-3 items-center rounded-lg py-2 md:py-6 px-2  h-44 md:h-52 border-2 border-gray-100 hover:border-teal-700 duration-200 transition-all ease-in-out"
							>
								<span role="image" aria-label={`${item.icon}`} className="font-emoji bg-teal-100 py-2 px-4 rounded-lg text-xl">
									{item.icon}
								</span>
								<h1 className="text-gray-900 tracking-wide font-medium text-lg">{item.text}</h1>
								<p className="text-gray-700 text-center">{item.description}</p>
							</div>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default ChooseType;
