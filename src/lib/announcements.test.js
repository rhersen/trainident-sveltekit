import { describe, it, expect } from 'vitest';
import announcements from '$lib/announcements.js';

const trainAnnouncement = [
	{
		ActivityType: 'Avgang',
		LocationSignature: 'Cst',
		ToLocation: [{ LocationName: 'G', Priority: 1, Order: 0 }]
	},
	{
		ActivityType: 'Ankomst',
		LocationSignature: 'K',
		ToLocation: [{ LocationName: 'G', Priority: 1, Order: 0 }]
	},
	{
		ActivityType: 'Avgang',
		LocationSignature: 'K',
		ToLocation: [{ LocationName: 'G', Priority: 1, Order: 0 }]
	},
	{
		ActivityType: 'Ankomst',
		LocationSignature: 'Sk',
		ToLocation: [{ LocationName: 'G', Priority: 1, Order: 0 }]
	},
	{
		ActivityType: 'Avgang',
		LocationSignature: 'Sk',
		ToLocation: [{ LocationName: 'G', Priority: 1, Order: 0 }]
	},
	{
		ActivityType: 'Ankomst',
		LocationSignature: 'G',
		ToLocation: [{ LocationName: 'G', Priority: 1, Order: 0 }]
	}
];
const response = {
	RESULT: [
		{
			TrainAnnouncement: trainAnnouncement
		}
	]
};

describe('announcements', () => {
	it('should', () => {
		expect(announcements(response)).toEqual([
			trainAnnouncement[0],
			trainAnnouncement[2],
			trainAnnouncement[4],
			trainAnnouncement[5]
		]);
	});
});
