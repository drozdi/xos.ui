import { useState } from 'react';
import { randomId } from '../../utils/id';
import { isString } from '../../utils/is';

export function useId(staticId) {
	const [uuid, setUuid] = useState(randomId());

	if (isString(staticId)) {
		return staticId;
	}

	return uuid;
}
