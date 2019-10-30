/**
 * @flow
 * @author Jean.h.ma 2019-10-30
 */
import * as React from "react"
import classnames from "classnames"

type Props = {
    children?: any,
    style?: Object,
    className?: string
};

export default React.memo<Props>(function (props: Props) {
    const {
        children,
        className,
        style
    } = props;
    return (
        <header className={classnames("header", className)} style={style}>{children}</header>
    )
});