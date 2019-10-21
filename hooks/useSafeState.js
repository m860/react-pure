/**
 * @flow
 * @author Jean.h.ma 2019-09-26
 */
import * as React from "react"
import useMounted from "./useMounted";

export default function <T>(initialState: T): [T, (nextState: T)=>any] {
    const [state, setState] = React.useState<T>(initialState);
    const mounted = useMounted();
    return [
        state,
        (nextState: any) => {
            if (mounted.current) {
                setState(nextState);
            }
        }
    ];
}