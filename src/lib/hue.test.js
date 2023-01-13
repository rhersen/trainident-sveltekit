import { describe, it, expect } from 'vitest';
import hue from '$lib/hue.js';

describe('hue', () => {
	it('handles falsy values', () => {
		expect(hue()).toBeUndefined();
		expect(hue(0)).toBe(120);
	});

	it('goes from green to yellow in 2 minutes', () => {
		expect(hue(60)).toBe(90);
		expect(hue(118)).toBe(61);
		expect(hue(120)).toBe(60);
	});

	it('goes slower from yellow to red', () => {
		expect(hue(120)).toBe(60);
		expect(hue(124)).toBe(59);
	});

	it('does not go too far past red', () => {
		expect(hue(480)).toBe(-30);
		expect(hue(645)).toBe(-30);
	});
});
