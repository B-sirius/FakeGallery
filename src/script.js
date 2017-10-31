'use strict'
import './reset.scss'
import './style.scss'

import {
    get,
    getRelativeWindowTop
} from './common.js'

let sidebarListener = {
    el: get('#js-sidebar'),
    rules: [{
        className: 'active',
        isActive() {
            let compareEl = get('#js-video');
            if (getRelativeWindowTop(compareEl) * -1 > compareEl.offsetHeight / 3)
                return true
            return false
        },
        isDormant() {}
    }]
}

let {el, rules} = sidebarListener;
window.addEventListener('scroll', () => {
    for (let rule of rules) {
        if (rule.isActive()) {
            el.classList.add(rule.className);
        }
    }
});