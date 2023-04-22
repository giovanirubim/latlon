const { PI, sqrt, sin, cos, asin, acos } = Math;

const radToDeg = (rad) => {
	return rad*(180/PI);
};

const degToRad = (deg) => {
	return deg*(PI/180);
};

const calcUnsignedAngle = (adj, opp) => {
	const rad = sqrt(adj*adj + opp*opp);
	return rad === 0 ? 0 : (
		opp >= 0 ? acos(adj/rad) : PI*2 - acos(adj/rad)
	);
};

const haversine = ([ aLat, aLon ], [ bLat, bLon ]) => acos(
	sin(aLat)*sin(bLat) +
	cos(aLat)*cos(bLat)*cos(aLon - bLon)
);

export const toVector = ([ lat, lon ]) => {
	const cosLat = cos(lat);
	return [
		sin(lon)*cosLat,
		sin(lat),
		cos(lon)*cosLat,
	];
};

export const fromVector = ([ x, y, z ]) => {
	const lat = asin(y/sqrt(x*x + y*y + z*z));
	const rad = sqrt(x*x + z*z);
	const lon = rad === 0 ? 0 : (
		x >= 0 ? acos(z/rad) : PI*2 - acos(z/rad)
	);
	return [ lat, lon ];
};

export const calcDistance = (aCoord, bCoord) => {
	return haversine(aCoord, bCoord);
};

export const calcAzimuth = (aCoord, bCoord) => {
	const [ aLat, aLon ] = aCoord;
	const [ bLat, bLon ] = bCoord;
	const cosBLat = cos(bLat);
	const dLon = bLon - aLon;
	const x = sin(dLon)*cosBLat;
	const y0 = sin(bLat);
	const z = cos(dLon)*cosBLat;
	const y1 = y0*cos(aLat) - z*sin(aLat);
	return calcUnsignedAngle(y1, x);
};

export const fromDegrees = ([ lat, lon ]) => [
	degToRad(lat),
	degToRad(lon),
];

export const toDegrees = ([ lat, lon ]) => [
	radToDeg(lat),
	radToDeg(lon),
];
