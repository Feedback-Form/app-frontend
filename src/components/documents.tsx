import React, { FC, ReactElement, useState } from 'react';
import { useWordState } from '../hooks/hooks';

const Documents: FC = (): ReactElement => {
	const docs = [];
	for (let i = 0; i < 20; i++) {
		docs.push(`doc_${i}`);
	}
	console.log('docs', docs);
	return (
		<>
			<div className="flex items-end w-3/4 ">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Documents</h1>
			</div>
			<div className="flex flex-wrap w-3/4 h-3/4 space-x-4 space-y-4">
				{docs.map((i, id) => {
					return (
						<div
							key={id}
							className="cursor-pointer flex w-48 h-64 shadow-md rounded-md items-end border-2 hover:border-indigo-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200"
						>
							<div className=" w-full px-3 py-2">{i}</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Documents;
