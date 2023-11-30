// export const getColor = v => {
//   // Generate random values for red, green, and blue
//   var red = Math.floor(Math.random() * 256);
//   var green = Math.floor(Math.random() * 256);
//   var blue = Math.floor(Math.random() * 256);

//   // Convert decimal values to hexadecimal and concatenate
//   var hexColor =
//     '#' +
//     red.toString(16).padStart(2, '0') +
//     green.toString(16).padStart(2, '0') +
//     blue.toString(16).padStart(2, '0');

//   return hexColor;
// };

export const getColor = () => {
  // Generate random hue values for both colors with a smaller separation
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + Math.floor(Math.random() * 30) + 30) % 360; // Smaller separation

  // Set fixed saturation and lightness values
  const saturation = 70;
  const lightness = 50;

  // Convert HSL values to RGB and then to hexadecimal
  const color1 = hslToHex(hue1, saturation, lightness);
  const color2 = hslToHex(hue2, saturation, lightness);

  return [color1, color2];
};

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
