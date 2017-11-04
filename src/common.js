'use strict';

let get = (selector) => {
    return document.querySelector(selector)
}

let getAbsoluteTop = (el) => {　　　　
    let actualTop = el.offsetTop;　　　　
    let current = el.offsetParent;　　　　
    while (current !== null) {　　　　　　
        actualTop += current.offsetTop;　　　　　　
        current = current.offsetParent;　　　　
    }　　　　
    return actualTop;
}

let getRelativeWindowTop = (el) => {
    return el.getBoundingClientRect().top;
}

let throttle = (fn ,interval = 50) => {
    let timeId = null;
    return () => {
        if (timeId === null) {
            timeId = setTimeout(() => {
                fn();

                clearTimeout(timeId);
                timeId = null;
            }, interval);
        }
    }
}

export default {
    get,
    getRelativeWindowTop,
    throttle
}