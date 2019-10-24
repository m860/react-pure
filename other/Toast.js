/**
 * @flow
 * @author Jean.h.ma 2019-09-23
 */
import * as React from "react"
import {EventEmitter} from "fbemitter"
import uuid from "uuid/v1"
import update from "immutability-helper"

type Props = {}

export default React.memo<Props>(function (props: Props) {

    const [items, setItems] = React.useState<Array<ToastItem & {
        expire: number,
    }>>([]);

    const callbackQueue = React.useRef<Array<{
        key: string,
        callback: Function
    }>>([]);

    const executed = React.useRef<string>([]);

    // const removeItem = React.useCallback((key: string) => {
    //     console.log(JSON.stringify(items));
    //     const index = items.findIndex(f => f.key === key);
    //     if (index >= 0) {
    //         setItems(
    //             update(items, {
    //                 [index]: {
    //                     expire: {$set: Date.now()}
    //                 }
    //             })
    //         )
    //     }
    // }, [items]);

    React.useEffect(() => {
        const append = (item: ToastItem) => {
            let nextItem = {...item};
            if (item.callback) {
                nextItem.expire = Date.now() + 24 * 60 * 60 * 1000;
                callbackQueue.current.push({
                    key: item.key,
                    callback: item.callback
                });
            } else {
                nextItem.expire = Date.now() + item.timeout;
            }
            setItems(update(items, {
                $push: [nextItem]
            }));
        };
        // $FlowFixMe
        emitter.addListener(KEY_APPEND_ITEM, append);

        let timer = null;
        if (items.length > 0) {
            timer = setInterval(() => {
                console.log("loop", executed.current.length)
                const nextItems = items.filter(f => {
                    if (f.callback) {
                        return executed.current.indexOf(f.key) < 0
                    }
                    return f.expire >= Date.now()
                });
                if (nextItems.length !== items.length) {
                    setItems(nextItems);
                }
            }, 1000);
        }

        // exec callback
        while (callbackQueue.current.length > 0) {
            const {key, callback: cb} = callbackQueue.current.shift();
            cb().finally(() => executed.current.push(key));
        }

        return () => {
            executed.current = [];
            emitter.removeAllListeners(KEY_APPEND_ITEM);
            if (timer) {
                clearInterval(timer);
            }
        }
    }, [items]);

    return (
        <span className="pure-toast">
            {items.map((item: ToastItem, index: number) => {
                return (
                    <div className={`pure-toast-item`} key={item.key}>
                        <span className={`pure-toast-item-${item.type}`}>{item.message}</span>
                    </div>
                );
            })}
        </span>
    )
});

export const ToastItemTypes = {
    info: "info",
    warn: "warn",
    error: "error"
};

export type ToastItem = {
    key: string,
    type: $Values<typeof ToastItemTypes>,
    message: any,
    timeout: number,
    callback?: Promise<*>
};

const emitter = new EventEmitter();

const KEY_APPEND_ITEM = "AppendItem";

export function info(message: any, rest: $Shape<ToastItem> = {}) {
    const item: ToastItem = {
        key: uuid(),
        timeout: 3000,
        ...rest,
        message,
        type: ToastItemTypes.info,

    };
    emitter.emit(KEY_APPEND_ITEM, item);
}

export function warn(message: any, rest: $Shape<ToastItem> = {}) {
    const item: ToastItem = {
        key: uuid(),
        timeout: 3000,
        ...rest,
        message,
        type: ToastItemTypes.warn,
    };
    emitter.emit(KEY_APPEND_ITEM, item);
}

export function error(message: any, rest: $Shape<ToastItem> = {}) {
    const item: ToastItem = {
        key: uuid(),
        timeout: 3000,
        ...rest,
        type: ToastItemTypes.error,
        message
    };
    emitter.emit(KEY_APPEND_ITEM, item);
}

export function promiseToast(callback: Promise<*>, rest: $Shape<ToastItem> = {}) {
    const item: ToastItem = {
        key: uuid(),
        type: ToastItemTypes.info,
        ...rest,
        callback
    };
    emitter.emit(KEY_APPEND_ITEM, item);
}