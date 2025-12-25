import localFont from 'next/font/local';

export const heliosextFont = localFont({
	src: [
		{
			path: '../../public/font/heliosext.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/font/heliosext_italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/font/heliosext_bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/font/heliosext_bold_italic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
	variable: '--heliosext',
	fallback: ['sans-serif'],
});
