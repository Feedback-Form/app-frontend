import React, { FC, ReactElement, useState } from 'react';
import Sidebar from '../components/sidebar';
import Transcribe from '../components/main/transcribe';
const TranscribePage: FC = (): ReactElement => {
	return (
		<section className="h-screen w-full flex overflow-hidden font-scrptai">
			<Sidebar />
			<Transcribe />
		</section>
	);
};
export default TranscribePage;
