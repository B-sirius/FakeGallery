'use strict'

let get = (selector) => {
    return document.querySelector(selector)
}

let getAbsoluteTop = (el) => {　　　　
    let actualTop = el.offsetTop　　　　
    let current = el.offsetParent　　　　
    while (current !== null) {　　　　　　
        actualTop += current.offsetTop　　　　　　
        current = current.offsetParent　　　　
    }　　　　
    return actualTop
}

let getRelativeWindowTop = (el) => {
    return el.getBoundingClientRect().top
}

export {
    get,
    getRelativeWindowTop
}