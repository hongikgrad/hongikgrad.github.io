import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html {
  font-size: 30px;
  width: 100%;
}

@media screen and (max-width: 2559px) {
    html {
        font-size: 20px;
    }
}

@media screen and (max-width: 1023px) {
    html {
        font-size: 16px;
    }
}

@media screen and (max-width: 767px) {
    html {
        font-size: 12px;
    }
}

body {
  margin: 0;
  padding: 0;
  font-family: Montserrat, Noto Sans KR, GothamSSmBook, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
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
}

a {
  -webkit-tap-highlight-color : transparent;
  text-decoration:none
}

a:link {
  color: #333;
}

a:visited {
  color: #000;
}

a:hover {
  color: #808080;
}

a:active {
  color: #808080;
}
`;

export default GlobalStyles;
