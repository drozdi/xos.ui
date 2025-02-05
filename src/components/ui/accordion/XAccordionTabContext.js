import { createSafeContext } from '../../internal/createSafeContext';

export const [XAccordionTabProvider, useXAccordionTabContext] = createSafeContext(
	'Accordion.Tab component was not found in the tree',
);
