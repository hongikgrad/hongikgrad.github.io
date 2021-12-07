import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html {
  height:100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: Noto Sans KR, GothamSSmBook, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212529;
  box-sizing: border-box;
  background-color:#ffffff;
  height:inherit;
}
* {
  box-sizing: inherit;
}
code {
  font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
input, button, textarea {
  font-family: inherit;
  :focus {
    outline:none;
  }
}
html, body, #root {
  min-height: 100vh;
}

a {
  -webkit-tap-highlight-color : transparent;
  text-decoration:none
}

@font-face {
  font-family:GothamXLight;
  src:url('./styles/Gotham-XLight.woff')
}

@font-face {
  font-family: GothamSSmBook;
  src: url('./styles/GothamSSm-Book.woff');
}

@font-face {
  font-family: GothamSSmBookItalic;
  src: url('./styles/GothamSSm-BookItalic.woff');
}

@font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 400;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');}



`;

export default GlobalStyles;
