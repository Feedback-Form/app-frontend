import React, { FC, ReactElement, useState } from 'react';

import { useWordState } from '../hooks/hooks';
import InputTextfield from '../components/inputtextfield';
import SummarySettings from '../components/summarysettings';
import OutputTextfield from '../components/outputtexfield';
import AudioDropzone from '../components/audiodropzone';
import Sidebar from '../components/sidebar';
import Documents from '../components/documents';

import Summarize from '../components/summarize';
const Dashboard: FC = (): ReactElement => {
	// const [maxWords, setMaxWords] = useState(300);

	// const [words, wordCount, handleWordChange, resetWords] = useWordState('');

	return (
		<section className="h-screen w-full flex overflow-hidden font-scrptai">
			<Sidebar />
			<Summarize />
			{/* <main className="flex-1 flex flex-col  bg-white text-gray-900  items-center justify-center space-y-1 ">
				<Documents />
			</main> */}
		</section>
	);
};

export default Dashboard;
