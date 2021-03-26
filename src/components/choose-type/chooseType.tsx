import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const ChooseType: FC = (): ReactElement => {
	const types: Array<{ text: string; route: string; icon: string }> = [
		{
			text: 'Digital Ad Copy',
			route: 'adcopy',
			icon: '💸',
		},
		{
			text: 'Instagram Captions',
			route: 'captions',
			icon: '🦄',
		},
		{
			text: 'Headlines',
			route: 'headlines',
			icon: '💥',
		},
		{
			text: 'Value Propositions',
			route: 'valuepropositions',
			icon: '🎈',
		},
	];
	return (
		<section className="flex-shrink flex flex-col items-center justify-center  h-full w-full">
			<div className="flex flex-col w-3/4 h-1/5 justify-center ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium md:pl-20">
					Choose content type
				</h1>
			</div>
			<div className="flex flex-col w-3/4 h-4/5 items-center space-y-10">
				{types.map((item, index) => {
					return (
						<NavLink exact to={`/generate/${item.route}`} key={index}>
							<button
								className="w-64 md:w-80 py-6 bg-teal-700 rounded-lg capitalize hover:bg-teal-600 text-white
									  transition-all ease-in-out duration-200 text-lg md:text-xl font-medium tracking-wide
									 focus:outline-none"
							>
								<p>
									<span className="pr-2 md:pr-4">{item.icon}</span>
									{item.text}
								</p>
							</button>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default ChooseType;
