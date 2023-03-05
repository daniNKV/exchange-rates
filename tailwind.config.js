
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'display': ['Staaltliches'],
      'sans': ['Roboto']
    },
    purge: [
      "./public/index.html",
    ],

    extend: {},
  },
  plugins: [],
}
