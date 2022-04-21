import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/styles.css'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faBold, faItalic, faHeading, fa1, fa2, fa3, fa4, fa5, fa6, faList, faListNumeric,faRulerHorizontal, faRotateLeft, faRotateRight, faImage } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone, faBold, faItalic, faHeading, fa1, fa2, fa3, fa4, fa5, fa6, faList, faListNumeric, faRulerHorizontal, faRotateLeft, faRotateRight, faImage);
createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')