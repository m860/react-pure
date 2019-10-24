/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */
import * as React from "react"
import Toast, {error, info, promiseToast, warn} from "../other/Toast";

export default {
    title: "Other",
    component: Toast
}

export const toast = () => {
    return (
        <div>
            <Toast/>
            <button type="button" className="pure-button" onClick={() => info(`info:${Date.now()}`)}>info</button>
            <button type="button" className="pure-button" onClick={() => warn(`warn:${Date.now()}`)}>warning</button>
            <button type="button" className="pure-button" onClick={() => error(`error:${Date.now()}`)}>error</button>
            <button type="button" className="pure-button" onClick={() => {
                info((
                    <>
                        <i className="fa fa-spinner animated infinite linear-rotate"></i>
                        loading ...
                    </>
                ))
            }}>自定义message
            </button>
            <button type="button" className="pure-button"
                    onClick={() => info(`info:${Date.now()}`, {timeout: 10 * 1000})}>自定义timeout，10s之后消失(默认是3s)
            </button>
            <button type="button" className="pure-button"
                    onClick={() => {
                        promiseToast(() => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                }, 5 * 1000);
                            })
                        }, {
                            message: "loading"
                        })
                    }}>promise message
            </button>
        </div>
    )
};