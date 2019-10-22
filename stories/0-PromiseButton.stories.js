/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */

import React from 'react';
import PromiseButton from "../buttons/PromiseButton";

export default {
    title: "PromiseButton",
    component: PromiseButton
}

export const promiseButton = () => {
    return (
        <div>
            <PromiseButton onPromise={() => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                })
            }}>Promise Button</PromiseButton>
            <PromiseButton onPromise={() => {
                return new Promise(() => {
                })
            }}>5秒超时(5秒是默认值)</PromiseButton>
            <PromiseButton timeout={2000}
                           onPromise={() => {
                               return new Promise(() => {
                               })
                           }}>2秒超时 <i className="fa fa-check-circle"></i></PromiseButton>
        </div>
    )
}
