/**
 * @flow
 * @author Jean.h.ma 2019-09-25
 */
import {useEffect, useRef} from "react"

export default function (): {| current: boolean |} {
    const mounted = useRef<boolean>(false);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, []);
    return mounted;
}