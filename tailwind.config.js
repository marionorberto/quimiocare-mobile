// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // Ensure this points to your source code
//     './src/**/*.{js,tsx,ts,jsx}',
//       "./App.{js,jsx,ts,tsx}",
//     "./src/screens/**/*.{js,jsx,ts,tsx}",
//     "./src/components/**/*.{js,jsx,ts,tsx}",
//     // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
//     // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}