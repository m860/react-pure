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

export const promiseButton = () => {
    return (
        <PromiseButton onPromise={() => {
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            })
        }}>Promise Button</PromiseButton>
    )
}

export const promiseButtonTimeout = () => {
    return (
        <div>
            <PromiseButton onPromise={() => {
                return new Promise(() => {
                })
            }}>Promise Button timeout after 5s(default value)</PromiseButton>
            <PromiseButton timeout={2000}
                           onPromise={() => {
                               return new Promise(() => {
                               })
                           }}>Promise Button timeout 2s</PromiseButton>
        </div>
    )
};

export const timeoutButton = () => {
    return (
        <div>
            <TimeoutButton timeout={20 * 1000}>倒计时10s</TimeoutButton>
        </div>
    )
}