/**
 * Smoothstep interpolation between a and b, at time t from 0 to 1
 * @param a
 * @param b
 * @param t
 * @returns {Number}
 */
function smoothstep(a, b, t) {
	t = Math.max(0, Math.min(1, t));
	var v = t * t * (3 - 2 * t);
	var v = t*t*t*(t*(t*6.0-15.0)+10.0);
	return b * v + a * (1 - v);
};


/**
 * Linear interpolation between a and b, at time t from 0 to 1
 * @param a
 * @param b
 * @param t
 * @returns {Number}
 */
function lerp(a, b, t) {
	return b * t + a * (1 - t);
}
