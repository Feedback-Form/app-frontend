import React, { FC, ReactElement, useState } from 'react';
import { useWordState } from '../hooks/hooks';

const Documents: FC = (): ReactElement => {
	const docs = [];
	for (let i = 0; i < 20; i++) {
		docs.push(`My Document_${i}`);
	}
	console.log('docs', docs);
	return (
		<>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Documents</h1>
			</div>
			<section className="flex xs:grid grid-cols-4 flex-wrap w-3/4 xl:w-1/2 h-3/4 gap-4">
				{docs.map((i, id) => {
					return (
						<div
							key={id}
							className="cursor-pointer w-48 h-64  shadow-md rounded-md items-end border-2 hover:border-indigo-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200"
						>
							<div className=" w-full px-4 pt-4 pb-3">{i}</div>
							<p className="px-4 text-sm font-thin">
								Corvus is a widely distributed genus of medium-sized to large birds in the family Corvidae. The genus includes species
								commonly...
							</p>
						</div>
					);
				})}
			</section>
		</>
	);
};

export default Documents;
