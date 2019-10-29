/**
 * @flow
 * @author Jean.h.ma 2019-10-29
 */
import * as React from "react"
import classnames from "classnames"
import useSafeState from "../hooks/useSafeState";

type Props = {
    heading: MenuItem,
    items: Array<MenuItem>,
    defaultActiveIndex?: number
}

export default React.memo<Props>(function (props: Props) {
    const {
        heading,
        items,
        defaultActiveIndex = 0
    } = props;

    const [activeIndex, setActiveIndex] = useSafeState(defaultActiveIndex);

    const menuClick = React.useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    return (
        <div className="vertical-menu">
            <div className="pure-menu">
                <a className={classnames("pure-menu-heading", heading.className)}
                   style={heading.style}
                   href={heading.path}>{heading.text}</a>

                <ul className="pure-menu-list">
                    {items.map((item: MenuItem, index: number) => {
                        return (
                            <li className="pure-menu-item" key={index}>
                                <a href={item.path}
                                   style={item.style}
                                   onClick={() => menuClick(index)}
                                   className={classnames("pure-menu-link", item.className, activeIndex === index && "pure-menu-selected")}>{item.text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
})

export type MenuItem = {
    path: string,
    text: any,
    style?: Object,
    className?: string,
};