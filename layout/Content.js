/**
 * @flow
 * @author Jean.h.ma 2019-10-28
 */
import * as React from "react"
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
    return (
        <div className={classnames("flex", className)} {...rest}>{children}</div>
    );
});