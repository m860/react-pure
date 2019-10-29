/**
 * @flow
 * @author Jean.h.ma 2019-10-24
 */
import * as React from "react"
import Pagination from "../nav/Pagination";
import Menu from "../nav/Menu";

export default {
    title: "Nav"
}

export const pagination = () => {
    const [index, setIndex] = React.useState(1);
    const [size, setSize] = React.useState(10);
    const [total, setTotal] = React.useState(20);

    React.useEffect(() => {
        setIndex(1);
    }, [total])

    return (
        <div className="pure-g">
            <div className="pure-u-1">
                <form className="pure-form pure-form-aligned">
                    <div className="pure-control-group">
                        <label>总记录数</label>
                        <input type="text" value={total} onChange={({target: {value}}) => setTotal(parseInt(value))}/>
                    </div>
                    <div className="pure-control-group">
                        <label>总页数</label>
                        <input type="text" value={size} onChange={({target: {value}}) => setSize(parseInt(value))}/>
                    </div>
                </form>
            </div>
            <div className="pure-u-1">
                <p>分页全部都是从1开始分页</p>
            </div>
            <div className="pure-u-1">
                <Pagination pageIndex={index} pageSize={size} total={total}
                            onChange={(pageIndex, pageSize) => {
                                setIndex(pageIndex)
                            }}/></div>
        </div>
    )
}

export const menu = () => {
    const [width, setWidth] = React.useState(800);
    const [height, setHeight] = React.useState(600);
    React.useEffect(() => {
        setWidth(window.screen.availWidth);
        setHeight(window.screen.availHeight);
    }, []);
    return (
        <>
            <h3>菜单</h3>
            <Menu heading={{text: "HEADING", path: "#"}}
                  style={{width: 150}}
                  items={[
                      {text: "disabled menu", disable: true, path: "javascript:void(0)"},
                      {text: "menu2", path: "javascript:void(0)"},
                      {text: "menu3", path: "javascript:void(0)"},
                  ]}/>
            <h3>菜单（包含子菜单）</h3>
            <Menu heading={{text: "HEADING", path: "#"}}
                  style={{width: 150}}
                  items={[
                      {text: "menu1", path: "javascript:void(0)"},
                      {text: "menu2", path: "javascript:void(0)"},
                      {
                          text: "DontAllowHover",
                          path: "javascript:void(0)",
                          allowHover: false,
                          children: [{text: "menu3-1", path: ""}]
                      },
                      {
                          text: "menu4",
                          path: "",
                          children: [
                              {
                                  text: "menu4-1",
                                  path: "",
                                  children: [
                                      {
                                          text: "menu4-1-1",
                                          path: ""
                                      }
                                  ]
                              }
                          ]
                      }
                  ]}/>
            <h3>水平菜单</h3>
            <Menu heading={{text: "HEADING", path: "#"}}
                  horizontal={true}
                  items={[
                      {text: "disabled menu", disable: true, path: "javascript:void(0)"},
                      {text: "menu2", path: "javascript:void(0)"},
                      {text: "menu3", path: "javascript:void(0)"},
                  ]}/>
            <h3>水平菜单（包含子菜单）</h3>
            <Menu heading={{text: "HEADING", path: "#"}}
                  horizontal={true}
                  items={[
                      {text: "menu1", path: "javascript:void(0)"},
                      {text: "menu2", path: "javascript:void(0)"},
                      {
                          text: "menu3",
                          path: "javascript:void(0)",
                          children: [{text: "menu3-1", path: ""}]
                      },
                      {
                          text: "menu4",
                          path: "",
                          children: [
                              {
                                  text: "menu4-1",
                                  path: "",
                                  children: [
                                      {
                                          text: "menu4-1-1",
                                          path: ""
                                      }
                                  ]
                              }
                          ]
                      }
                  ]}/>
            <h3>可滚动菜单</h3>
            <Menu heading={{text: "HEADING", path: "#"}}
                  horizontal={true}
                  scrollable={true}
                  style={{width: 200}}
                  items={[
                      {text: "menu1", path: "javascript:void(0)"},
                      {text: "menu2", path: "javascript:void(0)"},
                      {text: "menu3", path: "javascript:void(0)"},
                      {text: "menu4", path: "javascript:void(0)"},
                      {text: "menu5", path: "javascript:void(0)"},
                      {text: "menu6", path: "javascript:void(0)"},
                      {text: "menu7", path: "javascript:void(0)"},
                      {text: "menu8", path: "javascript:void(0)"},
                  ]}/>
            <h3>NO HEADING</h3>
            <Menu horizontal={true}
                  items={[
                      {text: "menu1", path: "javascript:void(0)"},
                      {text: "menu2", path: "javascript:void(0)"},
                  ]}/>
            <div style={{height: 300}}></div>
        </>
    )
}

