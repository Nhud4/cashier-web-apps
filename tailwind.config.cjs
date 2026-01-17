module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          1: '#1F1D2B',
          2: '#ABBBC2',
          3: '#393C49',
          4: '#2D303E',
          DEFAULT: '#1F1D2B',
        },
        orange: {
          DEFAULT: '#EA7C69'
        },
        white: {
          DEFAULT: '#FFFFFF'
        },
        neutral: {
          1: '#ABBBC2',
          2: '#889898',
          3: '#F5F5F5',
          4: '#F5F5F5',
          5: '#737373',
          DEFAULT: '#E0E6E9'
        }
      },
      boxShadow: {
        card: '0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
