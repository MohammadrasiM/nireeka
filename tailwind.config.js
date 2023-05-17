// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/**/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      xs: "430px",
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: (theme) => ({
        404: 'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
        "banner-homepage-lg": "url('/images/backgrounds/full-fs-image.png')",
        "banner-Fix_cover_1": "url('/images/backgrounds/cover-01-nireeka-prime.webp')",
        "banner-Fix_cover_2": "url('/images/backgrounds/cover-02.webp')",
        "fully-transparent": "url('/images/backgrounds/fully_transparent.png')",
        bike: "url('/images/byciNirik.jpg')",
      }),
      gradientColorStops: (theme) => ({
        BrownHelpCenter: "#4d2f0b",
        blueHelpCenter: "#0b294d",
      }),
      colors: {
        nireekaOrange: "#ff8a00",
        grayLight: "#DCDCDC",
        landingWhite: "#d9d9d9",
        landingGray: "#a7a7a7",
        landingGrayBorder: "#444444",
        nireekaGreen: "#62B800",
        forumGrayBorder: "#ebedef",
        avatarDarkGreen: "#31a24c",
        avatarLightGreen: "#deefe1",
        nireekaBorderColor: "#3a3a3a",
        customColorNIR: "#389fd4",
      },
      fontFamily: {
        body: ["Exo"],
        Impact: ['Impact']
      },
      boxShadow: {
        "leader-board-shadow":
          "box-shadow: 35px 1px 59px 9px rgba(0,0,0,0.72); -webkit-box-shadow: 35px 1px 59px 9px rgba(0,0,0,0.72); -moz-box-shadow: 35px 1px 59px 9px rgba(0,0,0,0.72)",
      },
      borderRadius: {
        3: "3rem",
      },
      spacing: {
        125: "0.125rem",
        375: "0.375rem",
        950: "27rem",
        1000: "30rem",
        1100: "35rem",
        1300: "39rem",
        "45remi": "45rem",
        1500: "50rem",
        1800: "80vh",
        7093: "93%",
        95: "95%",
        97: "97%",
        7007: "7%",
        100: "10%",
        150: "15%",
        200: "20%",
        250: "25%",
        300: "30%",
        350: "35%",
        400: "40%",
        500: "50%",
        600: "60%",
        650: "65%",
        700: "70%",
        750: "75%",
        800: "80%",
        850: "85%",
        900: "90%",
      },
      minHeight: {
        40: "40rem",
        17: "17rem",
      },
      minWidth: {
        25: "25px",
        100: "100vw",
        "12rem": "12rem",
      },
      maxWidth: {
        "3/4": "75%",
        90: "90%",
        11.5: "11.5rem",
        commentFull: "calc(100% - 6rem)",
      },
      width: {
        "1200w": "120%",
        "22W": "22rem",
        "200VW": "220vw",
        "w-152": "38rem",
        "w-90": "21rem",
        46: "46rem",
        commentFull: "calc(100% - 6rem)",
      },
      height: {
        "200VH": "220vh",
        "44remi": "44rem",
      },
      keyframes: {
        scroller: {
          "0%": {
            top: "0%",
          },
          "100%": {
            top: "80%",
          },
        },
        "slide-down": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(0%)",
          },
          "100%": {
            transform: "translateY(-100%)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      screens: {
        ts: "774px",
        tb: "983px",
        'xs-between': {'min': '0px', 'max': '639px'},
        'sm-between': {'min': '640px', 'max': '767px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }
  
        'md-between': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }
  
        'lg-between': {'min': '1024px', 'max': '1279px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
  
        'xl-between': {'min': '1280px', 'max': '1535px'},
        // => @media (min-width: 1280px and max-width: 1535px) { ... }
  
        '2xl-between': {'min': '1536px'},
        // => @media (min-width: 1536px) { ... }
        '3xl-between': {'min': '1706px'},
        // => @media (min-width: 1536px) { ... }
      },
      animation: {
        "slide-down": "slide-down 0.4s ease-in-out 1 forwards",
        "slide-up": "slide-up 0.4s ease-in-out 1 forwards",
        "fade-in": "fade-in 0.4s ease-in-out 1 forwards",
        "fade-out": "fade-out 0.4s ease-in-out 1 forwards",
        "slide-down-fade-out":
          "slide-down 0.4s ease-in-out 1 forwards, fade-out 0.4s ease-in-out 1 forwards,",
        "slide-up-fade-in":
          "slide-up 0.4s ease-in-out 1 forwards, fade-in 0.4s ease-in-out 1 forwards",
        scroller: "scroller 2s ease-out infinite forwards",
      },
      fontSize: {
        "3.5xl": "2rem",
        "1remi": "1rem",
        2.75: "2.75rem",
      },
      backgroundVideo: {
        "banner-revenant":
          "url('https://s6.uupload.ir/filelink/NIUL75V6kBgq_305bbbcd0e/introducing_the_all-new_nireeka_revenant_f20.mp4')",
        "motor-revenant":
          "url('https://imgurl.ir/uploads/k942897_reve0000.mp4')",
      },
    },
  },
  variants: { extend: { scrollbar: ["rounded"] } },
  plugins: [require("tailwind-scrollbar")],
};
