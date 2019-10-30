/**
 * @flow
 * @author Jean.h.ma 2019-10-28
 */
import * as React from "react";
import Layout from "../layout/Layout";
import Slider from "../layout/Slider";
import Content from "../layout/Content";
import Menu from "../nav/Menu";
import Header from "../layout/Header";

export default {
    title: "Layout"
}

export const slider = () => {
    const [width, setWidth] = React.useState(800);
    const [height, setHeight] = React.useState(600);
    React.useEffect(() => {
        setWidth(document.documentElement.clientWidth);
        setHeight(document.documentElement.clientHeight);
    }, []);
    return (
        <Layout className="flex-1 flex-row" style={{width, height}}>
            <Slider style={{backgroundColor: "#cccccc"}}>
                <Menu heading={{text: "HEADING", path: "#"}}
                      style={{width: "100%"}}
                      items={[
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                      ]}/>
            </Slider>
            <Layout className="flex-1 flex-col">
                <Header>
                    <h1>Title</h1>
                    <h2>Sub title</h2>
                </Header>
                <Content>
                    <p>Slide Menu 布局，当在小屏幕上运行时，slider会自动收起。</p>
                </Content>
            </Layout>
        </Layout>
    )
}

export const layout2 = () => {
    const [width, setWidth] = React.useState(800);
    const [height, setHeight] = React.useState(600);
    React.useEffect(() => {
        setWidth(document.documentElement.clientWidth);
        setHeight(document.documentElement.clientHeight);
    }, []);
    return (
        <Layout className="flex-1 flex-col" style={{width, height}}>
            <Header style={{padding: "0.5em 0", textAlign: "left"}}>
                <Menu heading={{text: "HEADING", path: "#"}}
                      horizontal={true}
                      items={[
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                          {text: "menu1", path: "#"},
                      ]}/>
            </Header>
            <Layout className="flex-1 flex-row">
                <Slider style={{backgroundColor: "#cccccc"}}>
                    <Menu style={{width: "100%"}}
                          items={[
                              {text: "menu1", path: "#"},
                              {text: "menu1", path: "#"},
                              {text: "menu1", path: "#"},
                              {text: "menu1", path: "#"},
                              {text: "menu1", path: "#"},
                              {text: "menu1", path: "#"},
                              {text: "menu1", path: "#"},
                          ]}/>
                </Slider>
                <Layout>

                </Layout>
            </Layout>
        </Layout>
    )
}