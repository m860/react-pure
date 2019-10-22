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
    onClick?: Function,
    renderCountdown?: (value: number)=>any
};

export default React.memo<Props>(function (props: Props) {
    const {
        timeout,
        className,
        children,
        disabled,
        onClick,
        renderCountdown = (value: number) => `${value}秒`,
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

    const _renderCountdown = React.useCallback(() => {
        if (running) {
            return (
                <span className="pure-button-timeout-countdown">{renderCountdown(time / 1000)}</span>
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
        {_renderCountdown()}
    </button>
});