import styled, {createGlobalStyle} from "styled-components";
import BGImage from './images/disneyland.jpg';

export const GlobalStyle = createGlobalStyle `
  html {
    height: 100%;
  }
  
  body {
    background-image: url(${BGImage}); 
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Catamaran',sans-serif;
  }
`


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  > p {
    color: #fff;
  }
  
  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
  
  h1 {
    font-family: Fascinate Inline, 'Arial Narrow Bold', sans-serif ;
    //background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    color: #fff;
    font-size: 4.5rem;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }
  
  .start, .next {
    cursor: pointer;
    background: #fff;
    border: 2px solid #D2E6F5;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  
  .start {
    max-width: 200px;
  }

`;
