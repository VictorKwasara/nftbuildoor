import * as fs from 'fs';

export default () => {
  
	for (let i = 0; i < 5; i++) {
		const string = {
			name: 'Zim Bird ' + i,
			symbol: 'ZimBird',
			description: 'A Zimbo bird soo cool',
			image: i + '.png',
			attributes: [
				{
					trait_type: 'accessory',
					value: 'lamp',
				},
				{
					trait_type: 'chair',
					value: 'red',
				},
				{
					trait_type: 'books',
					value: 'blue',
				},
			],
			properties: {
				files: [
					{
						uri: i + '.png',
						type: 'image/png',
					},
				],
			},
		};
		fs.writeFileSync('assets/' + i + '.json', JSON.stringify(string));
	}
};
