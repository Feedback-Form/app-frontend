import React, { FC, ReactElement, useState } from 'react';
import { useWordState } from '../hooks/hooks';

const SummarySettings: FC = (): ReactElement => {
	return (
		<section className="flex-shrink  flex flex-col items-center justify-center w-full h-3/4">
			<div className="flex items-start w-3/4">
				<h1 className="tracking-wide text-3xl text-gray-900 font-medium">Summary settings</h1>
			</div>
			<div className="w-3/4 h-3/4 rounded-md  space-y-12 ">
				<div className="justify-items-center">
					<h1 className="text-xl pb-8">Summary length</h1>

					<div className="flex space-x-12">
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							short
						</button>
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md  w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							short
						</button>
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md  w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							short
						</button>
					</div>
				</div>
				<div className="justify-items-center">
					<h1 className="text-xl pb-8">Summary type</h1>

					<div className="flex space-x-12">
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							basic
						</button>
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md  w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							one-sentence
						</button>
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md  w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							for a second grader
						</button>
					</div>
				</div>
				<div className="justify-items-center">
					<h1 className="text-xl pb-8">Summary tone</h1>

					<div className="flex space-x-12">
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							pragmatic
						</button>
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md  w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							normal
						</button>
						<button className="flex-shrink bg-gray-300 text-gray-600  hover:text-white hover:bg-indigo-400 focus:outline-none rounded-md  w-64 py-3 font-medium tracking-wide text-xl transition-all ease-in-out duration-200 items-center">
							creative
						</button>
					</div>
				</div>
				<div className="flex w-3/4 items-center">
					<button className="bg-indigo-500 hover:bg-indigo-400 focus:outline-none text-white rounded-md px-16 py-2 font-medium tracking-wide text-lg">
						Summarize text
					</button>
				</div>
			</div>
		</section>
	);
};

export default SummarySettings;
