import { describe, expect, it } from 'vitest';
import formatDelay from '$lib/formatDelay.js';

describe('formatDelay', () => {
	it('handles empty input', () => {
		expect(formatDelay({})).toBe('');
	});

	it('works', () => {
		expect(formatDelay(a('05'))).toBe('0');
		expect(formatDelay(a('07'))).toBe('0');
		expect(formatDelay(a('11'))).toBe('⅙');
		expect(formatDelay(a('13'))).toBe('⅕');
		expect(formatDelay(a('19'))).toBe('⅕');
		expect(formatDelay(a('21'))).toBe('⅓');
		expect(formatDelay(a('31'))).toBe('½');
		expect(formatDelay(a('39'))).toBe('⅗');
		expect(formatDelay(a('41'))).toBe('⅔');
	});
});

function a(s) {
	return {
		AdvertisedTimeAtLocation: '2023-06-30T08:21:00.000+02:00',
		TimeAtLocationWithSeconds: `2023-06-30T08:21:${s}.000+02:00`
	};
}
