import { generateEmailLink } from '..';

describe('Mailing Test', () => {
	test('Generate Email Link', () => {
		const link = generateEmailLink(
			{
				id: 1,
				username: 'bob',
				email: 'bob@example.com'
			},
			'http://localhost:4000'
		);

		expect(link).toBeDefined();
	});
});
