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
			text: 'Articlea Headlines',
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
			<div className="flex flex-col w-3/4 h-1/5 justify-center ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium md:pl-20">Choose content type</h1>
			</div>
			<div className="flex flex-col w-3/4 h-4/5 items-center space-y-10 overflow-y-auto ">
				{types.map((item, index) => {
					return (
						<NavLink exact to={`/generate/${item.route}`} key={index}>
							<div
								className="flex flex-col space-y-4 bg-teal-50 rounded-lg capitalize 
									  transition-all ease-in-out duration-200 text-lg md:text-xl font-medium tracking-wide
									 focus:outline-none"
							>
								<div className="text-lg text-gray-900 tacking-wide">
									<h1>{item.text}</h1>{' '}
									<span role="image" aria-label={`${item.icon}`}>
										{item.icon}
									</span>
								</div>
								<p className="text-base text-gray-700">{item.description}</p>
							</div>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default ChooseType;
