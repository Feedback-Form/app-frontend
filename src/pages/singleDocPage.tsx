import React, { FC, ReactElement, useState } from 'react';
import Sidebar from '../components/sidebar';
import EditDocument from '../components/editdocument';

const SingleDocPage: FC = (): ReactElement => {
	return (
		<section className="h-screen w-full flex  font-scrptai overflow-y-auto">
			<Sidebar />
			<EditDocument />
		</section>
	);
};
export default SingleDocPage;
