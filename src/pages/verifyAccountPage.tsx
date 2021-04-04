import React, { ReactElement, FC, useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import copykatLogoLong from '../images/copykat_logo_long.svg';
import axios from 'axios';

//components
import LoadingWidget from '../components/loadingWidget';

const VerifyAccountPage: FC = (): ReactElement => {
	const params = useParams<{ userId: string; token: string }>();
	const { userId, token } = params;
	const [isLoading, setIsLoading] = useState(false);
	const [responseMessage, setResponseMessage] = useState('');

	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/verify/${userId}/${token}`)
			.then((res: any) => {
				console.log('res', res);
				setResponseMessage(res.data.message);
				setIsLoading(false);
			})
			.catch((err: any) => {
				// setResponseMessage(err.response.data.message);
				setResponseMessage('Oops, something went wrong.');
				setIsLoading(false);
			});
	}, []);
	return (
		<section className="min-h-screen bg-gray-50 flex flex-col justify-center sm:py-12 font-scrptai">
			{isLoading && <LoadingWidget />}

			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md space-y-6">
				<img className="w-48 mx-auto" src={copykatLogoLong} alt="copykat_ai_logo" />

				<div className="space-y-4">
					<p
						className={`${
							responseMessage === `You've successfully verified your account!` ? 'text-green-500' : 'text-red-500'
						} font-medium text-xl text-center`}
					>
						{responseMessage}
					</p>
					{responseMessage !== `You've successfully verified your account!` && (
						<p className="text-gray-800 font-medium text-center text-xl">
							Please contact{' '}
							<a
								className="text-gray-700 hover:text-gray-600 ease-in-out duration-200 transition-all pl-1 "
								href={`mailto:${process.env.REACT_APP_MAILTO}`}
							>
								{process.env.REACT_APP_MAILTO}
							</a>
						</p>
					)}

					{responseMessage === `You've successfully verified your account!` && (
						<div>
							<p className="text-md font-base text-gray-700 py-5 text-center">
								You may close this window and log in again. or click on the button to navigate to the login page.
							</p>

							<NavLink to="/login">
								<button
									className="transition-all
                                 duration-200 bg-teal-700 hover:bg-teal-600 focus:bg-teal-600
                                   focus:outline-none  text-white w-full py-3 rounded-lg text-base
                                    tracking-wide shadow-sm hover:shadow-md font-medium text-center disabled:opacity-50"
								>
									<span className="inline-block mr-2">Go to login</span>
								</button>
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default VerifyAccountPage;
