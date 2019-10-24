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

    const [items, setItems] = React.useState<Array<ToastItem & { expire: number }>>([]);

    React.useEffect(() => {
        const append = (item: ToastItem) => {
            setItems(update(items, {$push: [{...item, expire: Date.now() + item.timeout}]}));
        };
        // $FlowFixMe
        emitter.addListener(KEY_APPEND_ITEM, append);

        let timer = null;
        if (items.length > 0) {
            timer = setInterval(() => {
                const nextItems = items.filter(f => f.expire >= Date.now());
                if (nextItems.length !== items.length) {
                    setItems(nextItems);
                }
            }, 1000);
        }

        return () => {
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
    message: string,
    timeout: number
};

const emitter = new EventEmitter();

const KEY_APPEND_ITEM = "AppendItem";

export function info(message: string, rest: $Shape<ToastItem> = {timeout: 3000}) {
    const item: ToastItem = {
        key: uuid(),
        ...rest,
        message,
        type: ToastItemTypes.info,

    };
    emitter.emit(KEY_APPEND_ITEM, item);
}

export function warn(message: string, rest: $Shape<ToastItem> = {timeout: 3000}) {
    const item: ToastItem = {
        key: uuid(),
        ...rest,
        message,
        type: ToastItemTypes.warn,
    };
    emitter.emit(KEY_APPEND_ITEM, item);
}

export function error(message: string, rest: $Shape<ToastItem> = {timeout: 3000}) {
    const item: ToastItem = {
        key: uuid(),
        ...rest,
        type: ToastItemTypes.error,
        message
    };
    emitter.emit(KEY_APPEND_ITEM, item);
}