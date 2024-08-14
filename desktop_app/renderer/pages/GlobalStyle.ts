import { createGlobalStyle, keyframes } from "styled-components";
import { minDevices, maxDevices } from "@/shared/styles/device";

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const GlobalStyleComponent = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body{
  width: 100%;
	height:100vh;
	margin:auto;
  overflow-x: hidden;
	background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
	display:flex;
	justify-content: center;
}
#titlebar {
  display: block;
  position: fixed;
  height: 32px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  background: #101012;
  color:#373737;
  z-index:999;
}
  #window-controls {
  -webkit-app-region: no-drag;
}

#window-controls .button {
  user-select: none;
}

.window-hover:hover {
    background: rgba(255,255,255,0.1);
  }
  .window-hover:hover:active {
    background: rgba(255,255,255,0.2);
  }

  .window-hover-close:hover {
    background: #E81123 !important;
  }
  .window-hover-close:active {
    background: #F1707A !important;
  }
  .window-hover-close:active .icon {
    filter: invert(1);
  }

.mac-controls:hover .mac-hover{
    display: flex;
}
.mac-hover{
display: none;
}
#restore-button {
  display: none !important;
}

	#window-title{
	margin-left:9px;
	margin-top:6px;
	img{
	width: 22px;
	height: 19px;
	flex-shrink: 0;
	}
  }
#titlebar #drag-region {
  width: 100%;
  height: 24px;
  -webkit-app-region: drag;
}
  #window-controls {
  display: grid;
  grid-template-columns: repeat(3, 46px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
cursor: pointer;
}


#window-controls .button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
#min-button {
  grid-column: 1;
}
#max-button, #restore-button {
  grid-column: 2;
   cursor: pointer;
}
#close-button {
  grid-column: 3;
   cursor: pointer;
}
  #window-controls {
  -webkit-app-region: no-drag;
}

#window-controls .button {
  user-select: none;
}


.container{
  width: 100%;
	height:100vh;
	margin:auto;
  overflow-x: none;
	background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
	display:flex;
	justify-content: center;
      /* 전역 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #242424;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /* Firefox 스크롤바 스타일 */
  * {
    scrollbar-width: thin;
    scrollbar-color: #888 #242424;
  }
  *::-webkit-scrollbar {
    width: 6px;
  }
  *::-webkit-scrollbar-track {
    background: #242424;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #242424;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
}
.container.slide-up {
  width: 100vw;
	animation: ${slideUp} 1s ease-out;
}
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

export default GlobalStyleComponent;
