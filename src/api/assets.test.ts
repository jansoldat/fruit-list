import { describe, it, expect } from 'vitest';
import { getAssetUrl, CLOUDINARY_URL } from './assets'; // Replace with the correct path to your module
import defaultImage from '../assets/imagePlaceholder.png';

describe('getAssetUrl', () => {
	it('should return the correct Cloudinary URL for a known fruit', () => {
		const name = 'watermelon';
		const expectedUrl = `${CLOUDINARY_URL}/v1724710451/watermelon_fotgwn.webp`;
		const result = getAssetUrl(name);
		expect(result).toBe(expectedUrl);
	});

	it('should return the default image when the fruit name is not found', () => {
		const name = 'unknownFruit';
		const result = getAssetUrl(name);
		expect(result).toBe(defaultImage);
	});

	it('should return the default image when an empty string is provided', () => {
		const name = '';
		const result = getAssetUrl(name);
		expect(result).toBe(defaultImage);
	});
});
