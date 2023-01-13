import './index.scss'
import MyWebsite from './myWebsite.doubledot'

MyWebsite().forEach(component => {
    document.body.appendChild(component)
});

