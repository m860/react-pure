/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */
import * as React from "react"
import Toast, {error, info, warn} from "../other/Toast";

export default {
    title: "Other",
    component: Toast
}

export const toast = () => {
    return (
        <div>
            <Toast/>
            <button type="button" className="pure-button" onClick={() => info(`info:${Date.now()}`)}>info</button>
            <button type="button" className="pure-button" onClick={() => warn(`warn:${Date.now()}`)}>warn</button>
            <button type="button" className="pure-button" onClick={() => error(`error:${Date.now()}`)}>error</button>
        </div>
    )
};