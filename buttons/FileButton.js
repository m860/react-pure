/**
 * @flow
 * @author Jean.h.ma 2019-10-23
 */
import * as React from "react"
import classnames from "classnames"

type Props = {
    onFileChange?: (files: ?FileList)=>any,
    className?: ?string,
    children?: any,
    disabled?: boolean,
    multiple?: boolean,
    // 上传进度0～100
    progress?: number
};

export default React.memo<Props>(function (props: Props) {
    const {
        onFileChange,
        className,
        children,
        disabled = false,
        multiple = false,
        progress = 0
    } = props;

    const fileRef = React.useRef();

    const fileChange = React.useCallback(({target: {files}}) => {
        if (onFileChange) {
            onFileChange(files);
        }

    }, []);

    const fileClick=React.useCallback(()=>{
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    },[]);

    const renderProgress = React.useCallback(() => {
        if (progress > 0) {
            return <div style={{width: `${progress % 100}%`}} className="pure-file-upload-progress"></div>
        }
        return null;
    }, [progress])

    return (
        <button disabled={disabled || progress > 0}
                type="button"
                className={classnames("pure-button pure-button-file", className)}>
            {children}
            <input type="file"
                   ref={fileRef}
                   multiple={multiple}
                   onClick={fileClick}
                   onChange={fileChange}/>
            {renderProgress()}
        </button>
    )
});