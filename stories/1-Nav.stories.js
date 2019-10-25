/**
 * @flow
 * @author Jean.h.ma 2019-10-24
 */
import * as React from "react"
import Pagination from "../nav/Pagination";

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