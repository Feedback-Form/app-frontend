import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
//hooks

const ChooseType: FC = (): ReactElement => {
	// ["adcopy", "captions", "headlines", "valuepropositions",]
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
		<section className="flex-shrink  flex flex-col items-center justify-center h-3/4 w-full space-y-10 ">
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">
					Choose content type
				</h1>
			</div>
			<div className="flex flex-col w-3/4 h-3/4 justify-center items-center space-y-10">
				{types.map((item, index) => {
					return (
						<NavLink exact to={`/generate/${item.route}`} key={index}>
							<button
								className="w-80 py-8  bg-gray-200 rounded-md capitalize hover:bg-teal-700
							 			hover:text-teal-50 transition-all ease-in-out duration-20 text-xl font-medium tracking-wide
										 focus:outline-none"
							>
								<p>
									<span className="md:pr-4">{item.icon}</span>
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
