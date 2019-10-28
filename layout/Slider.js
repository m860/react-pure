/**
 * @flow
 * @author Jean.h.ma 2019-10-28
 */
import * as React from "react"
import useSafeState from "../hooks/useSafeState";
import classnames from "classnames"

type Props = {
    className?: string,
    children?: any
};

export default React.memo<Props>(function (props: Props) {
    const {
        className = "",
        children,
        ...rest
    } = props;

    const [active, setActive] = useSafeState(false);

    const toggleSlider = React.useCallback(() => {
        setActive(!active);
    }, [active])

    return (
        <>
            <div
                className={classnames("flex pure-slider", className, active && "pure-slider-active")} {...rest}>{children}</div>
            <a className={classnames("pure-slider-menu", active && "pure-slider-menu-active")}
               onClick={toggleSlider}>
                <span></span>
            </a>
        </>
    )
});