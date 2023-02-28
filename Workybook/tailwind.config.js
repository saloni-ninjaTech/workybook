const postCssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  rules: [
    {
      test: /\.less$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            syntax: 'postcss-less',
            plugins: () => [postCssImport, tailwindcss('./tailwind.config.js'), autoprefixer]
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    }
  ],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1600px'
      },
      colors: {
        primary: '#5470FF',
        success: '#D9D9D9',
        info: '#67BCFA',
        black: '#000000',
        white: '#ffffff'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
