/**
 * @flow
 * @author Jean.h.ma 2019-10-28
 */
import * as React from "react";
import Layout from "../layout/Layout";
import Slider from "../layout/Slider";
import Content from "../layout/Content";

export default {
    title: "Layout"
}

export const slider = () => {
    const [width, setWidth] = React.useState(800);
    const [height, setHeight] = React.useState(600);
    React.useEffect(() => {
        setWidth(window.screen.availWidth);
        setHeight(window.screen.availHeight);
    }, []);
    return (
        <Layout className="flex-1 flex-row" style={{width, height}}>
            <Slider style={{backgroundColor: "black"}}></Slider>
            <Content className="flex-1">当width&lt;568px侧边栏会自动收起来</Content>
        </Layout>
    )
}