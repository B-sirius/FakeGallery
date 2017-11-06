'use strict';
import './reset.scss';
import './style.scss';

import _ from './common.js';

let sidebarClass = {
    // 监听器作用对象
    el: _.get('#js-sidebar'),
    // 与该对象有关的规则
    rules: [{
        // 有关的class
        className: 'active',
        // class属性是否触发
        isActive() {
            let compareEl;
            if (this._cache['#js-video']) {
                compareEl = this._cache['#js-video'];
            } else {
                compareEl = _.get('#js-video');
                this._cache['#js-video'] = compareEl;
            }

            if (_.getRelativeWindowTop(compareEl) * -1 > compareEl.offsetHeight / 3)
                return true;
            return false;
        },
        // class属性是否被隐藏
        isDormant() {
            let compareEl;
            if (this._cache['#js-video']) {
                compareEl = this._cache['#js-video'];
            } else {
                compareEl = _.get('#js-video');
                this._cache['#js-video'] = compareEl;
            }

            if (_.getRelativeWindowTop(compareEl) * -1 > compareEl.offsetHeight / 3)
                return false;
            return true;
        },
        // 私有缓存
        _cache: {},
    }]
};

let bgShapeClass = {
    el: _.get('#js-bgShape'),
    rules: [{
        className: 'active',
        isActive() {
            let compareEl;
            if (this._cache['#js-video']) {
                compareEl = this._cache['#js-video'];
            } else {
                compareEl = _.get('#js-video');
                this._cache['#js-video'] = compareEl;
            }

            if (_.getRelativeWindowTop(compareEl) < 0)
                return true;
            return false;
        },
        isDormant() {
            let compareEl;
            if (this._cache['#js-video']) {
                compareEl = this._cache['#js-video'];
            } else {
                compareEl = _.get('#js-video');
                this._cache['#js-video'] = compareEl;
            }

            if (_.getRelativeWindowTop(compareEl) < 0)
                return false;
            return true;
        },
        _cache: {},
    }],
};

let classListenerList = [];
classListenerList.push(sidebarClass);
classListenerList.push(bgShapeClass);

let posFn = (() => {
    let el = _.get('#js-bgShapeWrapper');
    return function() {
        let f = 0.55 + window.scrollY * 0.001;
        el.style.transform = `matrix3d(1, -0.36397, 0, 0, 0, ${f}, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
    }
})();

(() => {
    let classToggle = () => {
        for (let listener of classListenerList) {
            let {el, rules} = listener;
            for (let rule of rules) {
                if (!el.classList.contains(rule.className) && rule.isActive()) {
                    el.classList.add(rule.className);
                } else if (el.classList.contains(rule.className) && rule.isDormant()) {
                    el.classList.remove(rule.className);
                }
            }
        }
    }

    let scrollHandler = _.throttle(() => {
        classToggle();
        posFn();
    }, 30);
    window.addEventListener('scroll', scrollHandler);
})();