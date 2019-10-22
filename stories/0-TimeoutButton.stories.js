/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */

import React from 'react';
import TimeoutButton from "../buttons/TimeoutButton";

export default {
    title: "TimeoutButton",
    component:TimeoutButton
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