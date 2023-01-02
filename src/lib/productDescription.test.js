import { describe, it, expect } from 'vitest';
import productDescription from '$lib/productDescription.js';

describe('productDescription', () => {
	it('handles empty input', () => {
		expect(productDescription()).toBe('');
		expect(productDescription([])).toBe('');
	});

	it('handles Pendeltåg', () => {
		expect(
			productDescription([
				{ Code: 'PNA054', Description: 'SL Pendeltåg' },
				{ Code: 'PNA088', Description: '41' }
			])
		).toBe('41');
	});

	it('abbreviates', () => {
		expect(productDescription([{ Code: 'PNA023', Description: 'SJ InterCity' }])).toBe('SJ IC');
		expect(productDescription([{ Code: 'PNA025', Description: 'SJ Regional' }])).toBe('SJ Reg');
		expect(productDescription([{ Code: 'PNA026', Description: 'SJ Snabbtåg' }])).toBe('SJ Snabb');
		expect(productDescription([{ Code: 'PNA040', Description: 'Västtågen' }])).toBe('Västtåg');
		expect(productDescription([{ Code: 'PNA020', Description: 'Pågatågen' }])).toBe('Pågatåg');
		expect(productDescription([{ Code: 'PNA044', Description: 'Öresundståg' }])).toBe('Öresund');
	});
});
