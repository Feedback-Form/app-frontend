import React, { ReactElement, useState } from 'react';
import LoadingWidget from '../loadingWidget';
import { Line } from 'react-chartjs-2';

//services
import { getResponseStatistics } from '../../services/appService';

const Dashboards = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);

	const data = {
		labels: ['1', '2', '3', '4', '5', '6'],
		datasets: [
			{
				data: [12, 19, 3, 5, 2, 3],
				fill: false,
				borderColor: '#3B82F6',
				borderWidth: 3.5,
				radius: 0,
				borderCapStyle: 'round',
				borderJoinStyle: 'round',
			},
		],
	};

	const options = {
		scales: {
			yAxes: {
				ticks: {
					beginAtZero: true,
				},

				grid: {
					display: false,
					drawBorder: false,
				},
			},
			xAxes: {
				ticks: {
					beginAtZero: true,
				},

				grid: {
					display: false,
					drawBorder: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};
	return (
		<>
			{isLoading && <LoadingWidget />}
			<section className="w-full flex flex-col items-center justify-center  bg-gray-50 text-gray-900">
				<div className="space-y-10 w-3/4">
					<div className="flex  justify-center space-x-10">
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg w-full lg:w-1/2">
							<h2 className="text-gray-900 font-semibold">Daily Rating Count</h2>
							<Line data={data} options={options} type={Line} />
						</div>
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg w-full lg:w-1/2">
							<h2 className="text-gray-900 font-semibold">Weekly Rating Count</h2>
							<Line data={data} options={options} type={Line} />
						</div>
					</div>
					<div className="flex  justify-center space-x-10">
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg w-full lg:w-1/2">
							<h2 className="text-gray-900 font-semibold">Average Daily Rating Count</h2>
							<Line data={data} options={options} type={Line} />
						</div>
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg w-full lg:w-1/2">
							<h2 className="text-gray-900 font-semibold">Average Weekly Rating Count</h2>
							<Line data={data} options={options} type={Line} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Dashboards;
