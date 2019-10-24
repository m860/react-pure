/**
 * @flow
 * @author Jean.h.ma 2019-10-21
 */

import React from 'react';
import FileButton from "../buttons/FileButton";
import PromiseButton from "../buttons/PromiseButton";
import TimeoutButton from "../buttons/TimeoutButton";

export default {
    title: "Button"
}

export const button = () => {
    return (
        <div>
            <button className="pure-button">Default Button</button>
            <button className="pure-button pure-button-primary">Primary Button</button>
            <button className="pure-button pure-button-danger">Danger Button</button>
            <button className="pure-button pure-button-primary">Icon Button <i className="fa fa-upload"></i></button>
        </div>
    )
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

export const promiseButton = () => {
    return (
        <div>
            <PromiseButton onPromise={() => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                })
            }}>Promise Button</PromiseButton>
            <PromiseButton onPromise={() => {
                return new Promise(() => {
                })
            }}>5秒超时(5秒是默认值)</PromiseButton>
            <PromiseButton timeout={2000}
                           onPromise={() => {
                               return new Promise(() => {
                               })
                           }}>2秒超时 <i className="fa fa-check-circle"></i></PromiseButton>
        </div>
    )
}

export const timeoutButton = () => {
    return (
        <div>
            <TimeoutButton timeout={20 * 1000}>倒计时10s</TimeoutButton>
            <TimeoutButton timeout={20 * 1000}
                           renderCountdown={(value) => `剩余${value}秒`}>倒计时10s(自定义countdown)</TimeoutButton>
        </div>
    )
}