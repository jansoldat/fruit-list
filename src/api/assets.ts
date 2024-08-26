import defaultImage from '../assets/imagePlaceholder.png';

/* == Parameters ==
  c_auto  = cropping auto
  h_90    = height 90
  f_auto  = format auto
  g_auto  = gravity center auto
*/

export const CLOUDINARY_URL =
	'https://res.cloudinary.com/djxcun8mo/image/upload/f_auto/';

const getImagePath = (name: string) => {
	const imagesMap: Record<string, string> = {
		watermelon: 'v1724710451/watermelon_fotgwn.webp',
		tomato: 'v1724710450/tomato_r1f6up.webp',
		tangerine: 'v1724710450/tangerine_n9rzxg.webp',
		strawberry: 'v1724710449/strawberry_xa5e1v.webp',
		raspberry: 'v1724710448/raspberry_fstrpq.webp',
		pumpkin: 'v1724710448/pumpkin_phn3p5.webp',
		pomelo: 'v1724710447/pomelo_akw26x.webp',
		pomegranate: 'v1724710446/pomegranate_x2pflt.webp',
		plum: 'v1724710445/plum_w47pqe.webp',
		pitahaya: 'v1724710444/pitahaya_ur3umx.webp',
		pineapple: 'v1724710444/pineapple_s9mna9.webp',
		passionfruit: 'v1724710444/passion-fruit_hu7xb4.webp',
		persimmon: 'v1724710442/persimmon_pqxrhm.webp',
		peach: 'v1724710442/peach_rlypd8.webp',
		orange: 'v1724710441/orange_yw4ubi.webp',
		papaya: 'v1724710440/papaya_nduuo7.webp',
		melon: 'v1724710440/melon_ykgyed.webp',
		morus: 'v1724710440/morus_i1yicm.webp',
		mangosteen: 'v1724710437/mangostan_qzlyfg.webp',
		mango: 'v1724710437/mango_dwp6xb.webp',
		lingonberry: 'v1724710436/lingonberry_xa5kup.webp',
		lychee: 'v1724710437/lychee_zvu4xs.webp',
		lime: 'v1724710436/lime_cc0uvt.webp',
		lemon: 'v1724710434/lemon_oqyf3m.webp',
		'japanese-persimmon': 'v1724710433/japanese-persimmon_xoixsp.webp',
		kiwifruit: 'v1724710434/kiwifruit_u3ipdy.webp',
		kiwi: 'v1724710433/kiwi_cef46z.webp',
		jackfruit: 'v1724710432/jackfruit_nrvyis.webp',
		'horned-melon': 'v1724710431/horned-melon_wvb6ht.webp',
		hazelnut: 'v1724710431/hazelnut_wvpbfv.webp',
		guava: 'v1724710430/guava_dxmtdi.webp',
		greenapple: 'v1724710429/green-apple_ibndee.webp',
		grape: 'v1724710429/grape_luy3ib.webp',
		gooseberry: 'v1724710429/gooseberry_huqjfa.webp',
		fig: 'v1724710429/fig_mjzwjo.webp',
		feijoa: 'v1724710428/feijoa_vm9xzm.webp',
		durian: 'v1724710427/durian_deusyy.webp',
		dragonfruit: 'v1724710427/dragonfruit_lw5ub2.webp',
		cranberry: 'v1724710426/cranberry_eehsbs.webp',
		cherry: 'v1724710426/cherry_mdqlqd.webp',
		'ceylon-gooseberry': 'v1724710425/ceylon-gooseberry_bkgdpi.webp',
		blueberry: 'v1724710425/blueberry_b3vwci.webp',
		blackberry: 'v1724710425/blackberry_ohxjbp.webp',
		apricot: 'v1724710423/apricot_ezvb8a.webp',
		banana: 'v1724710424/banana_uspm4l.webp',
		avocado: 'v1724710424/avocado_k6wd8k.webp',
		apple: 'v1724710423/apple_k0sso3.webp',
		annona: 'v1724710423/annona_wuiwb2.webp',
		pear: 'v1724711647/Pear_image_1_tglsn7.webp',
	};

	return imagesMap?.[name] ?? null;
};

export const getAssetUrl = (name: string) => {
	const imagePath = getImagePath(name.toLowerCase().replace(' ', '-'));
	if (!imagePath) {
		console.log(name);
		return defaultImage;
	}
	return `${CLOUDINARY_URL}/${imagePath}`;
};
