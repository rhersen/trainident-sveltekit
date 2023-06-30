import { describe, expect, it } from 'vitest';
import formatDelay from '$lib/formatDelay.js';

describe('formatDelay', () => {
	it('handles empty input', () => {
		expect(formatDelay({})).toBe('');
	});

	it('works', () => {
		expect(formatDelay(a('05'))).toBe('0');
		expect(formatDelay(a('07'))).toBe('⅒');
		expect(formatDelay(a('32'))).toBe('½');
	});
});

function a(s) {
	return {
		AdvertisedTimeAtLocation: '2023-06-30T08:21:00.000+02:00',
		TimeAtLocationWithSeconds: `2023-06-30T08:21:${s}.000+02:00`
	};
}
