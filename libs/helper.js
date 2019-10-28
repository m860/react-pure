/**
 * @flow
 * @author Jean.h.ma 2019-10-28
 */

export function addClassName(ele: HTMLElement, className: string) {
    const cn = ele.getAttribute("class");
    if (cn) {
        let arr = cn.split(" ");
        arr = arr.concat(className.split(" "));
        ele.setAttribute("class", arr.join(" "));
    } else {
        ele.setAttribute("class", className);
    }
}

export function removeClassName(ele: HTMLElement, className: string) {
    const cn = ele.getAttribute("class");
    if (cn) {
        let arr = cn.split(" ");
        const arr2 = className.split(" ");
        arr2.forEach(f => {
            const index = arr.indexOf(f);
            if (index >= 0) {
                arr.splice(index, 1);
            }
        });
        ele.setAttribute("class", arr.join(" "));
    }
}