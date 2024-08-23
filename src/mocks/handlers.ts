import { http, HttpResponse } from 'msw';
import fruitMockImage from './fruitMockImage.webp';

export const handlers = [
	// https://res.cloudinary.com/djxcun8mo/image/upload/v1724299656/watermelon_jrkuw2.webp
	http.get(/\/djxcun8mo\/image\/*/, async () => {
		const buffer = await fetch(fruitMockImage).then(res => res.arrayBuffer());

		return HttpResponse.arrayBuffer(buffer, {
			headers: {
				'Content-Type': 'image/jpeg',
			},
		});
	}),
];
