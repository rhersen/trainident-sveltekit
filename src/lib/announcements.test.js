import { describe, expect, it } from 'vitest';
import announcements from '$lib/announcements.js';

describe('announcements', () => {
	it('removes Ankomst', () => {
		const sj = [
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

		expect(announcements({ RESULT: [{ TrainAnnouncement: sj }] })).toEqual([
			sj[0],
			sj[2],
			sj[4],
			sj[5]
		]);
	});

	it('shows Ankomst if there is no Avgang', () => {
		const sl = [
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T08:21:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Söc',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				TimeAtLocation: '2023-06-30T08:21:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:21:32.000+02:00',
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '2',
				ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }]
			},
			{
				ActivityType: 'Ankomst',
				AdvertisedTimeAtLocation: '2023-06-30T08:24:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Söd',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				TimeAtLocation: '2023-06-30T08:24:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:24:23.000+02:00',
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '4'
			},
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T08:27:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Söd',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				TimeAtLocation: '2023-06-30T08:27:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:27:25.000+02:00',
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '4',
				ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }]
			},
			{
				ActivityType: 'Ankomst',
				AdvertisedTimeAtLocation: '2023-06-30T08:30:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Öte',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				TimeAtLocation: '2023-06-30T08:29:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:29:45.000+02:00',
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '2'
			},
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T08:30:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Öte',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				TimeAtLocation: '2023-06-30T08:31:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:31:09.000+02:00',
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '2',
				ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }]
			},
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T08:32:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				LocationSignature: 'Dån',
				TimeAtLocation: '2023-06-30T08:33:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:33:13.000+02:00'
			},
			{
				ActivityType: 'Ankomst',
				AdvertisedTimeAtLocation: '2023-06-30T08:35:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Rön',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				TimeAtLocation: '2023-06-30T08:34:00.000+02:00',
				TimeAtLocationWithSeconds: '2023-06-30T08:34:42.000+02:00',
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '2'
			},
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T08:35:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Rön',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '2',
				ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }]
			},
			{
				ActivityType: 'Ankomst',
				AdvertisedTimeAtLocation: '2023-06-30T08:40:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Tu',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '4'
			},
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T08:40:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Tu',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '4',
				ViaToLocation: [{ LocationName: 'Sci', Priority: 1, Order: 0 }]
			},
			{
				ActivityType: 'Avgang',
				AdvertisedTimeAtLocation: '2023-06-30T09:56:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'Kn',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '1'
			},
			{
				ActivityType: 'Ankomst',
				AdvertisedTimeAtLocation: '2023-06-30T10:05:00.000+02:00',
				AdvertisedTrainIdent: '2220',
				FromLocation: [{ LocationName: 'Söc', Priority: 1, Order: 0 }],
				LocationSignature: 'U',
				ProductInformation: [
					{ Code: 'PNA054', Description: 'SL Pendeltåg' },
					{ Code: 'PNA086', Description: '40' }
				],
				ToLocation: [{ LocationName: 'U', Priority: 1, Order: 0 }],
				TrackAtLocation: '3'
			}
		];

		expect(announcements({ RESULT: [{ TrainAnnouncement: sl }] })).toEqual([
			sl[0],
			sl[2],
			sl[4],
			sl[5],
			// sl[6],
			sl[7],
			sl[9],
			sl[10],
			sl[11]
		]);
	});
});
