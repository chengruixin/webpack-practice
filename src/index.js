import content from './hello.txt';
import './index.css';
import './index.less';
import './index.scss';
import logo from './assets/images/logo.png';

console.log(content);

// append image
const img = new Image();
img.src = logo;
document.body.appendChild(img);