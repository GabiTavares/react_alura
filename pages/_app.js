function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body,box {
          font-family: 'Open Sans', sans-serif;
          
          animation-name: cores;
          animation-duration: 7s;
          animation-iteration-count: infinite;
        }
        @keyframes cores{
            0% {background: #DDB8E0;}
            20% {background: #96EDA8;}
            40% {background: #F7A1B2;}
            60% {background: #B6CCCE;}
            80% {background: #FEC65D;}
            100% {background: #DDB8E0;}
        }
  
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }

export default function MyApp ({Component, pageProps}){
    return(
        <>
    <GlobalStyle />
    <Component {...pageProps }/>
    </>
    )
    
    
    
}