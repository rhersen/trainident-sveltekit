import { describe, expect, it } from 'vitest';
import formatDelay from '$lib/formatDelay.js';

describe('formatDelay', () => {
	it('handles empty input', () => {
		expect(formatDelay({})).toBe('');
	});

	it('works', () => {
		expect(formatDelay(a('08:21', '08:21:05'))).toBe('0');
		expect(formatDelay(a('08:21', '08:21:07'))).toBe('0');
		expect(formatDelay(a('08:21', '08:21:11'))).toBe('⅙');
		expect(formatDelay(a('08:21', '08:21:13'))).toBe('⅕');
		expect(formatDelay(a('08:21', '08:21:19'))).toBe('⅕');
		expect(formatDelay(a('08:21', '08:21:21'))).toBe('⅓');
		expect(formatDelay(a('08:21', '08:21:31'))).toBe('½');
		expect(formatDelay(a('08:21', '08:21:39'))).toBe('⅗');
		expect(formatDelay(a('08:21', '08:21:41'))).toBe('⅔');
		expect(formatDelay(a('08:21', '08:22:05'))).toBe('1m');
	});
});

function a(advertised, time) {
	return {
		AdvertisedTimeAtLocation: `2023-06-30T${advertised}:00.000+02:00`,
		TimeAtLocationWithSeconds: `2023-06-30T${time}.000+02:00`
	};
}
