import React, { ReactElement, FC, useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import scrptAiLogo from '../images/scrptai_logo.svg';
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
			.post(
				`${process.env.REACT_APP_SCRPTAI_BACKEND}/user/verify/${userId}/${token}`,
			)
			.then((res: any) => {
				console.log('res', res);
				setResponseMessage(res.data.message);
				setIsLoading(false);
			})
			.catch((err: any) => {
				setResponseMessage(err.response.data.message);
				setIsLoading(false);
			});
	}, []);
	return (
		<section className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 font-scrptai">
			{isLoading && <LoadingWidget />}

			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md space-y-6">
				<div className="flex justify-center w-full">
					<img className="w-28 " src={scrptAiLogo} alt="scrpt_ai_logo" />
				</div>

				<div>
					<p
						className={`${
							responseMessage === `You've successfully verified your account!`
								? 'text-green-500'
								: 'text-red-500'
						} font-medium text-xl`}
					>
						{responseMessage}
					</p>

					{responseMessage === `You've successfully verified your account!` && (
						<div>
							<p className="text-lg font-medium text-gray-700">
								You may close this window and log in again. or click on the
								button to navigate to the login page.
							</p>

							<NavLink to="/login">
								<button
									className="transition-all
                                 duration-200 bg-teal-700 hover:bg-teal-600 focus:bg-teal-600
                                   focus:outline-none  text-white w-full py-3 rounded-lg text-base
                                    tracking-wide shadow-sm hover:shadow-md font-medium text-center  disabled:opacity-50"
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
