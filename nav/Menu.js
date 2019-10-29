/**
 * @flow
 * @author Jean.h.ma 2019-10-29
 */
import * as React from "react"
import classnames from "classnames"
import useSafeState from "../hooks/useSafeState";

type Props = {
    heading?: ?MenuItem,
    items: Array<MenuItem>,
    defaultActiveIndex?: number,
    // 水平菜单
    horizontal?: boolean,
    className?: string,
    style?: Object,
    // 菜单是否支持滚动
    scrollable?: boolean
}

export default React.memo<Props>(function (props: Props) {
    const {
        heading,
        items,
        defaultActiveIndex = 0,
        horizontal = false,
        className,
        style,
        scrollable = false
    } = props;

    const [activeIndex, setActiveIndex] = useSafeState(defaultActiveIndex);

    const menuClick = React.useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const hasChildren = React.useCallback((item: MenuItem) => {
        return item.children && item.children instanceof Array && item.children.length > 0;
    }, []);

    const allowHover = React.useCallback((item: MenuItem) => {
        return item.allowHover !== false;
    }, []);

    const isDisable = React.useCallback((item: MenuItem) => {
        return item.disable === true;
    }, []);

    const renderHeading = React.useCallback(() => {
        if (heading) {
            return (
                <a className={classnames("pure-menu-heading", heading.className)}
                   style={heading.style}
                   href={heading.path}>{heading.text}</a>
            );
        }
        return null;
    }, [heading]);

    const renderChildren = React.useCallback((item: MenuItem, index: number) => {
        if (item.children && item.children.length > 0) {
            return (
                <ul className="pure-menu-children">
                    {item.children.map((child: MenuItem, childIndex: number) => {
                        return (
                            <li className={classnames(
                                "pure-menu-item",
                                hasChildren(child) && "pure-menu-has-children",
                                allowHover(child) && "pure-menu-allow-hover",
                                isDisable(child) && "pure-menu-disabled"
                            )}
                                key={childIndex}>
                                <a href={child.path}
                                   style={child.style}
                                   className={classnames("pure-menu-link", item.className)}>{child.text}</a>
                                {renderChildren(child, childIndex)}
                            </li>
                        );
                    })}
                </ul>
            );
        }
        return null;
    }, [items]);

    return (
        <div
            className={classnames("pure-menu", className, horizontal && "pure-menu-horizontal", scrollable && "pure-menu-scrollable")}
            style={style}>
            {renderHeading()}

            <ul className="pure-menu-list">
                {items.map((item: MenuItem, index: number) => {
                    const children = item.children ? item.children : [];
                    return (
                        <li className={classnames(
                            "pure-menu-item",
                            activeIndex === index && "pure-menu-selected",
                            allowHover(item) && "pure-menu-allow-hover",
                            hasChildren(item) && "pure-menu-has-children",
                            isDisable(item) && "pure-menu-disabled"
                        )}
                            key={index}>
                            <a href={item.path}
                               style={item.style}
                               onClick={() => menuClick(index)}
                               className={classnames("pure-menu-link", item.className)}>{item.text}</a>
                            {renderChildren(item, index)}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
})

export type MenuItem = {
    path: string,
    text: any,
    style?: Object,
    className?: string,
    allowHover?: boolean,
    children?: Array<MenuItem>,
    disable?: boolean
};