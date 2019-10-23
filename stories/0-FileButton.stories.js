/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */

import React from 'react';
import FileButton from "../buttons/FileButton";

export default {
    title: "FileButton",
    component: FileButton
}

export const fileButton = () => {
    const [files, setFiles] = React.useState(null);
    const [progress, setProgress] = React.useState(0);

    const renderFiles = React.useCallback(() => {
        if (files) {
            return Array.from(files).map(file => {
                return file.name
            }).join(";")
        }
    }, [files]);

    React.useEffect(() => {
        if (files && files.length > 0 && progress < 100) {
            const timer = setInterval(() => setProgress(progress + 1), 16);
            return () => {
                clearInterval(timer);
            }
        } else {
            setFiles(null);
        }
    }, [files, progress]);

    React.useEffect(() => {
        setProgress(0);
    }, [files])

    return (
        <div>
            <FileButton className="pure-button-primary"
                        onFileChange={value => setFiles(value)}>上传文件</FileButton>
            <FileButton onFileChange={value => setFiles(value)} multiple>上传文件(多选)</FileButton>
            <FileButton disabled={true}>禁用状态</FileButton>
            <FileButton>上传文件 <i className="fa fa-upload"></i></FileButton>
            <FileButton progress={progress}
                        onFileChange={value => setFiles(value)}>上传进度条 <i className="fa fa-upload"></i></FileButton>
            <div>{renderFiles()}</div>
        </div>
    )
}