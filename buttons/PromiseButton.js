/**
 * @flow
 * @author Jean.h.ma 2019-09-25
 */
import * as React from "react"
import EffectButton from "./EffectButton"
import useMounted from "../hooks/useMounted";

type Props = {
    onPromise: ()=>Promise<*>,
    onClick?: Function
};

export default React.memo<Props>(function (props: Props) {

    const {
        onPromise,
        onClick,
        ...rest
    } = props;

    const mounted = useMounted();
    const [effect, setEffect] = React.useState<boolean>(false);
    return (
        <EffectButton {...rest}
                      effect={effect}
                      onClick={async () => {
                          setEffect(true);
                          try {
                              await onPromise();
                          } catch (ex) {
                          }
                          if (mounted.current) {
                              setEffect(false);
                          }
                      }}/>
    )
});