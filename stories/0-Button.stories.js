/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */

import React from 'react';

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
