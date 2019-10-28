/**
 * @flow
 * @author Jean.h.ma 2019-10-25
 */
import * as React from "react"
import {addClassName, removeClassName} from "../libs/helper";

type Props = {
    children: any,
    style?: Object,
    className?: string
};

export default React.memo<Props>(function (props: Props) {
    const {
        children,
        style,
        className = ""
    } = props;

    // React.useLayoutEffect(() => {
    //     const body = document.body;
    //     const className = "flex flex-1"
    //     if (body) {
    //         addClassName(body, className);
    //     }
    //     return () => {
    //         if (body) {
    //             removeClassName(body, className);
    //         }
    //     }
    // }, []);

    return (
        <div className={`flex ${className}`} style={style}>{children}</div>
    )
});