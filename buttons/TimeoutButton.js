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
    disabled?: boolean,
    onClick?: Function
};

export default React.memo<Props>(function (props: Props) {
    const {
        timeout,
        className,
        children,
        disabled,
        onClick,
        ...rest
    } = props;

    const [time, setTime] = React.useState<number>(timeout);
    // 按钮状态
    const [running, setRunning] = React.useState(false);

    React.useEffect(() => {
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

    const renderCountdown = React.useCallback(() => {
        if (running) {
            return (
                <span className="pure-button-timeout-countdown">{time / 1000}秒</span>
            )
        }
        return null;
    }, [running, time]);

    return <button {...rest}
                   className={classnames("pure-button", running && "pure-button-timeout-running", className)}
                   onClick={(...args) => {
                       setRunning(true);
                       onClick && onClick(...args);
                   }}
                   disabled={disabled || running}>
        <span>{children}</span>
        {renderCountdown()}
    </button>
});