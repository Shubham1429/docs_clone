module.exports = {
  content:[
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        animation: {
            'bounce-slow': '1s bounce ease infinite',    
        },
        keyframes: {
            bounce: {
                to:{
                    transform: 'translateY(25px)'
                }
            }
        }
    },
},
  plugins: [],
}
