/**
 * @flow
 * @author Jean.h.ma 2019-09-23
 */
import * as React from "react"
import useSafeState from "../hooks/useSafeState";
import classnames from "classnames"

type Props = {
    pageIndex: number,
    pageSize: number,
    total: number,
    onChange: (pageIndex: number, pageSize: number)=>any,
    // 最好是基数
    displayPages?: number
}

export default React.memo<Props>(function (props: Props) {
    const {
        pageIndex = 1,
        pageSize = 20,
        total = 0,
        onChange,
        displayPages = 9
    } = props;

    const [totalPage, setTotalPage] = useSafeState<number>(Math.ceil(total / pageSize));
    const [pages, setPages] = useSafeState<Array<number>>([]);
    React.useEffect(() => {
        const h = Math.floor(displayPages / 2);
        let min = pageIndex - h;
        if (min < 1) {
            min = 1;
        }
        let max = pageIndex + h;
        if (max > totalPage) {
            max = totalPage;
        }
        let nextPages = [];
        for (let i = min; i <= max; i++) {
            nextPages.push(i);
        }
        setPages(nextPages);
    }, [totalPage, pageIndex, displayPages])
    React.useEffect(() => {
        const nextTotalPage = Math.ceil(total / pageSize);
        if (totalPage !== nextTotalPage) {
            setTotalPage(nextTotalPage);
        }
    }, [total, pageSize]);

    const prev = () => {
        let nextPageIndex = pageIndex - 1;
        if (nextPageIndex < 1) {
            nextPageIndex = 1;
        }
        onChange(nextPageIndex, pageSize);
    };
    const next = () => {
        let nextPageIndex = pageIndex + 1;
        if (nextPageIndex > totalPage) {
            nextPageIndex = totalPage;
        }
        onChange(nextPageIndex, pageSize);
    };
    const goto = (index: number) => {
        onChange(index, pageSize);
    };

    return (
        <ul className="pure-pagination">
            <li>
                <a onClick={prev} className={pageIndex <= 1 ? "disabled" : ""}>
                    <i className="fa fa-angle-left"></i>
                </a>
            </li>
            {pages.map((item: number) => {
                return (
                    <li key={item}>
                        <a className={classnames(item === pageIndex && "active")}
                           onClick={() => goto(item)}>{item}</a>
                    </li>
                )
            })}
            <li>
                <a onClick={next} className={pageIndex >= totalPage ? "disabled" : ""}>
                    <i className="fa fa-angle-right"></i>
                </a>
            </li>
        </ul>
    )
});