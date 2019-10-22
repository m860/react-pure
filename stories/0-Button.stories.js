/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */

import React from 'react';
import {action} from '@storybook/addon-actions';
import PromiseButton from "../buttons/PromiseButton";
import TimeoutButton from "../buttons/TimeoutButton";

export default {
    title: "Button"
}

export const button = () => {
    return (
        <div>
            <button className="pure-button">Default Button</button>
            <button className="pure-button pure-button-primary">Primary Button</button>
            <button className="pure-button pure-button-danger">Danger Button</button>
            <button className="pure-button pure-button-primary">Icon Button <i className="fa fa-upload"></i></button>
        </div>
    )
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

export const timeoutButton = () => {
    return (
        <div>
            <TimeoutButton timeout={20 * 1000}>倒计时10s</TimeoutButton>
            <TimeoutButton timeout={20 * 1000}
                           renderCountdown={(value) => `剩余${value}秒`}>倒计时10s(自定义countdown)</TimeoutButton>
        </div>
    )
}