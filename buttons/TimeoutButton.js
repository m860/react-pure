/**
 * @flow
 * @author Jean.h.ma 2019-09-21
 */
import * as React from "react"
import classnames from "classnames"

type Props = {
    timeout: number,
    className?: string,
    children?: any,
    onClick?: Function,
    disabled?: boolean
};

export default React.memo<Props>(function (props: Props) {
    const {
        timeout,
        className,
        children,
        onClick,
        disabled,
        ...rest
    } = props;

    const [time, setTime] = React.useState<number>(timeout);
    // 按钮状态
    const [running, setRunning] = React.useState(false);

    React.useEffect(() => {
        // let timer = null;
        // const run = () => {
        //     if (timer) {
        //         clearTimeout(timer);
        //     }
        //     if (time <= 0) {
        //         setRunning(false);
        //         return;
        //     }
        //     timer = setTimeout(() => {
        //         setTime(time - 1000);
        //     }, 1000);
        // };
        // running && run();
        // return () => {
        //     if (timer) {
        //         clearTimeout(timer);
        //     }
        // }
        let timer = null;
        if (running) {
            timer = setTimeout(() => {
                if (time <= 0) {
                    setTime(timeout);
                    setRunning(false);
                } else {
                    setTime(time - 1000);
                }
            }, 1000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [running, time]);

    const renderChildren = () => {
        if (running) {
            return `${time / 1000}秒`;
        }
        return children;
    }

    return <button className={classnames("pure-button", className)}
                   type="button"
                   onClick={(...args) => {
                       setRunning(true);
                       onClick && onClick(...args);
                   }}
                   disabled={disabled || running}>{renderChildren()}</button>
});