import React, { FC, ReactElement, useState } from 'react';
import Sidebar from '../components/sidebar';
import Transcribe from '../components/main/transcribe';
import Documents from '../components/documents';
const DocumentsPage: FC = (): ReactElement => {
	return (
		<section className="h-screen w-full flex overflow-hidden font-scrptai">
			<Sidebar />
			<Documents />
		</section>
	);
};
export default DocumentsPage;
