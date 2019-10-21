/**
 * @flow
 * @author Jean.h.ma 2019-09-25
 */
import * as React from "react"
import EffectButton from "./EffectButton"
import useMounted from "../hooks/useMounted";

type Props = {
    onPromise: ()=>Promise<*>,
    timeout?: number,
};

export default React.memo<Props>(function (props: Props) {

    const {
        onPromise,
        timeout = 5 * 1000,
        ...rest
    } = props;

    const mounted = useMounted();
    const [effect, setEffect] = React.useState<boolean>(false);

    const clickHandler = React.useCallback(async () => {
        setEffect(true);
        try {
            await onPromise();
        } catch (ex) {
        }
        if (mounted.current) {
            setEffect(false);
        }
    }, [mounted]);

    const timeoutHandler = React.useCallback(() => setEffect(false), []);

    return (
        <EffectButton {...rest}
                      effect={effect}
                      onClick={clickHandler}
                      timeout={timeout}
                      onTimeout={timeoutHandler}/>
    )
});