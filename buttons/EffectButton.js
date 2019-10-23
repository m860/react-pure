/**
 * @flow
 * @author Jean.h.ma 2019-09-24
 */

import * as React from "react"
import classnames from "classnames"

type Props = {
    className?: string,
    style?: Object,
    children?: any,
    timeout?: number,
    onTimeout?: ()=>any,
    effect: boolean,
    disabled?: boolean
};

export default React.memo<Props>(function (props: Props) {
    const {
        children,
        className = "",
        effect = false,
        timeout = -1,
        onTimeout,
        disabled = false,
        ...rest
    } = props;

    React.useEffect(() => {
        let timer = null;
        if (effect && timeout > 0) {
            // start
            timer = setTimeout(() => onTimeout && onTimeout(), timeout)
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [effect]);


    const renderEffect = React.useCallback(() => {
        if (effect) {
            return (
                <div className="pure-effect-spinner">
                    <i className="fa fa-spinner animated infinite linear-rotate"></i>
                </div>
            )
        }
        return null;
    }, [effect]);

    return <button {...rest}
                   className={classnames("pure-button", className, effect && "pure-button-effect")}
                   disabled={disabled || effect}>{children}{renderEffect()}</button>
});