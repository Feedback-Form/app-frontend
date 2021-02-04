import React, { FC, ReactElement } from 'react';
type DeleteWidgetProps = { item: string };

const DeleteWidget = ({ item }: DeleteWidgetProps): ReactElement => {
	return (
		<section className="absolute h-full w-full ">
			<div className="absolute w-full h-full z-50">
				<div className="flex justify-center h-full w-full items-center">
					<div className="w-3/4 md:w-1/3 xl:w-1/4 bg-white rounded-md px-10 py-8 space-y-6">
						<div className="space-y-2">
							<h1 className="tracking-wide font-semibold text-xl text-gray-900">Delete &quot;{item}&quot;?</h1>
							<h3 className="text-lg text-gray-800">This action can&apos;t be undone.</h3>
						</div>
						<div className="flex space-x-6 justify-end">
							<button
								className="py-2 px-6 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200
                        tracking-wide font-medium
                        "
							>
								Cancel
							</button>
							<button
								className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 
                        focus:outline-none focus:ring-2 focus:ring-red-800 transition-all ease-in-out duration-200
                        tracking-wide font-medium
                        "
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute w-full h-full bg-gray-300 z-0 opacity-50"></div>
		</section>
	);
};

export default DeleteWidget;
