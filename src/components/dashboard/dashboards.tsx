import React, { ReactElement, useEffect, useState } from 'react';
import dateFormat from 'dateformat';

//components
import LoadingWidget from '../loadingWidget';
import { Line } from 'react-chartjs-2';

//services
import { getResponseStatistics } from '../../services/appService';

//interfaces
import { ResponseStatisticsBody } from '../../interfaces/responseStatisticsInterface';

const Dashboards = (): ReactElement => {
	const [isLoading, setIsLoading] = useState(false);
	const [authToken, setAuthToken] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5ZDVhN2Q1OGFmYjE0MWU0NTY4M2EiLCJpYXQiOjE2MjYzNjM5ODYsImV4cCI6MTYyODk1NTk4Nn0.iq5uP8Q3l4u0JfDndAzVKXp_UCbxeUjen4blyh5rHe8',
	);
	const [formId, setFormId] = useState('60f30144a02c029c5bb2bd0e');
	const [startDate, setStartDate] = useState('10-07-2021');
	const [endDate, setEndDate] = useState('18-07-2021');
	const [statistics, setStatistics] = useState<ResponseStatisticsBody>();
	const [ratingCountDaily, setRatingCountDaily] = useState<any>();
	const [ratingCountWeekly, setRatingCountWeekly] = useState<any>();
	const [averageRatingDaily, setAverageRatingDaily] = useState<any>();
	const [averageRatingWeekly, setAverageRatingWeekly] = useState<any>();

	function getLabels(data: ResponseStatisticsBody): string[] {
		return data.reviewsCount.ratingCountDaily.map(i => dateFormat(i.date, 'mmm dd'));
	}
	function getDashboardData(dashboardType: string, data: ResponseStatisticsBody): number[] {
		if (dashboardType === 'ratingCountDaily') {
			return data.reviewsCount.ratingCountDaily.map(i => i.responseCountDaily);
		}
		if (dashboardType === 'ratingCountWeekly') {
			return data.reviewsCount.ratingCountWeekly.map(i => i.responseCountWeekly);
		}
		if (dashboardType === 'averageRatingDaily') {
			return data.averageRating.averageRatingDaily.map(i => i.averageRatingDaily);
		}
		if (dashboardType === 'averageRatingWeekly') {
			return data.averageRating.averageRatingWeekly.map(i => i.averageRatingWeekly);
		}
		return [1, 2, 3, 4];
	}

	async function getResponseStatistics_(): Promise<void> {
		try {
			setIsLoading(true);
			const response = await getResponseStatistics(authToken, formId, startDate, endDate);
			setRatingCountDaily({
				labels: getLabels(response),
				datasets: [
					{
						data: getDashboardData('ratingCountDaily', response),
						fill: false,
						borderColor: '#3B82F6',
						borderWidth: 3.5,
						radius: 0,
						borderCapStyle: 'round',
						borderJoinStyle: 'round',
					},
				],
			});

			setRatingCountWeekly({
				labels: getLabels(response),
				datasets: [
					{
						data: getDashboardData('ratingCountWeekly', response),
						fill: false,
						borderColor: '#3B82F6',
						borderWidth: 3.5,
						radius: 0,
						borderCapStyle: 'round',
						borderJoinStyle: 'round',
					},
				],
			});
			setAverageRatingDaily({
				labels: getLabels(response),
				datasets: [
					{
						data: getDashboardData('averageRatingDaily', response),
						fill: false,
						borderColor: '#3B82F6',
						borderWidth: 3.5,
						radius: 0,
						borderCapStyle: 'round',
						borderJoinStyle: 'round',
					},
				],
			});
			setAverageRatingWeekly({
				labels: getLabels(response),
				datasets: [
					{
						data: getDashboardData('averageRatingWeekly', response),
						fill: false,
						borderColor: '#3B82F6',
						borderWidth: 3.5,
						radius: 0,
						borderCapStyle: 'round',
						borderJoinStyle: 'round',
					},
				],
			});
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getResponseStatistics_();
	}, [startDate, endDate]);

	const options = {
		parsing: {
			// xAxisKey: 'date',
			yAxisKey: 'responseCountDaily',
		},
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
				labels: {
					font: {
						size: 14,
						weight: 500,
						family: 'font-scrptai',
					},
				},
			},
		},
	};
	return (
		<>
			{isLoading && <LoadingWidget />}
			<section className="w-full flex flex-col items-center justify-center  bg-gray-50 text-gray-900">
				<div className="space-y-10 w-3/4">
					<div className="flex  justify-center space-y-10 lg:space-y-0 lg:space-x-10 w-full flex-wrap lg:flex-nowrap">
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg ">
							<h2 className="text-gray-900 font-semibold">Daily Rating Count</h2>
							<Line data={ratingCountDaily} options={options} type={Line} height={250} width={500} />
						</div>
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg ">
							<h2 className="text-gray-900 font-semibold">Weekly Rating Count</h2>
							<Line data={ratingCountWeekly} options={options} type={Line} height={250} width={500} />
						</div>
					</div>
					<div className="flex  justify-center space-y-10 lg:space-y-0 lg:space-x-10 flex-wrap lg:flex-nowrap">
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg ">
							<h2 className="text-gray-900 font-semibold">Average Daily Rating Count</h2>
							<Line data={averageRatingDaily} options={options} type={Line} height={250} width={500} />
						</div>
						<div className="flex flex-col space-y-4  bg-white p-4 rounded-lg ">
							<h2 className="text-gray-900 font-semibold">Average Weekly Rating Count</h2>
							<Line data={averageRatingWeekly} options={options} type={Line} height={250} width={500} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Dashboards;
