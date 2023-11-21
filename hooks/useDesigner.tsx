'use client';

import { useContext } from 'react';

import { DesignerContext } from '@/providers/designer-context-provider';

export const useDesigner = () => {
	const context = useContext(DesignerContext);

	if (!context) {
		throw new Error(
			"Hook 'useDesigner' must be used within a 'DesignerContext'",
		);
	}

	return context;
};
