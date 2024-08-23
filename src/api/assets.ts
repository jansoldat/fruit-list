import defaultImage from '../assets/defaultFruitImage.webp';

/* == Parameters ==
  c_auto  = cropping auto
  h_90    = height 90
  f_auto  = format auto
  g_auto  = gravity center auto
*/

export const CLOUDINARY_URL =
	'https://res.cloudinary.com/djxcun8mo/image/upload/c_auto,h_90,f_auto,g_auto/v1724299656';

const getImagePath = (name: string) => {
	const imagesMap: Record<string, string> = {
		watermelon: 'watermelon_jrkuw2.webp',
	};

	return imagesMap?.[name] ?? null;
};

export const getAssetUrl = (name: string) => {
	const imagePath = getImagePath(name);
	if (!imagePath) {
		return defaultImage;
	}
	return `${CLOUDINARY_URL}/${imagePath}`;
};
