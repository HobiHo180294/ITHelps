// Імпортування необхідних модулей
import { Dynamic } from '@/types';

type StyledKey = 'linkBody' | 'divBody';

export const metricStyled: Dynamic<StyledKey, string> = {
	linkBody: 'flex-center gap-1',
	divBody: 'flex-center flex-wrap gap-1',
};
