import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { StatusPageProps } from './status-page-interface';

const StatusPage = ({ success, destinationPathName }: StatusPageProps): ReactElement => {
	return (
		<section className="flex justify-center items-center bg-gray-100 h-screen w-screen">
			<div className="w-3/4 md:w-1/3 xl:w-1/4 rounded-md px-10 py-8  text-center space-y-6">
				<div className="flex justify-center">
					{success ? (
						<svg
							className="stroke-current text-green-400 w-36 h-36"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					) : (
						<svg
							className="stroke-current text-red-400 w-36 h-36"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					)}
				</div>

				<h1 className={`text-3xl font-medium ${success ? 'text-green-400' : 'text-red-400'}`}>
					{success ? 'Success!' : 'Something went wrong'}
				</h1>
				<div>
					<NavLink to={`/${destinationPathName}`}>
						<button className="focus:outline-none list-none text-xl text-gray-700 font-medium tracking-wide hover:text-gray-700 bg-gray-200 hover:bg-gray-300 focus:bg-gray-200 rounded-lg ease-in-out duration-200 transition-all px-5 py-4">
							Go back to CopykatAI
						</button>
					</NavLink>
				</div>
			</div>
		</section>
	);
};

export default StatusPage;
