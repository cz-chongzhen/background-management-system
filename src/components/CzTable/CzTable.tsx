import React, {useState, useEffect} from "react";
import "./CzTable.less";
import {Table} from "antd";
import {Resizable} from "react-resizable";
import {SpinProps} from "antd/lib/spin";
import {GetPopupContainer, TableLocale, TablePaginationConfig} from "antd/lib/table/interface";
import {ColumnProps} from 'antd/es/table';

interface ITableTitleProps {
    onResize: () => void,
    width: number
}

const ResizeableTitle: React.FC<ITableTitleProps> = props => {
    const {onResize, width, ...restProps} = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={Number(width)}
            height={0}
            handle={<span
                className={`react-resizable-handle react-resizable-handle-se`}
                onClick={e => {
                    e.stopPropagation();
                }}
            />}
            onResize={onResize}
            draggableOpts={{enableUserSelectHack: false}}
        >
            <th {...restProps} />
        </Resizable>
    );
};

type SortOrder = "descend" | "ascend" | null;

declare const tableLayoutTypes: ["auto", "fixed"];
type tableLayoutType = typeof tableLayoutTypes[number];
type SizeType = 'small' | 'middle' | 'large' | undefined;

interface ICzTableProps {
    className?: string,
    tableLayout?: tableLayoutType,
    bordered?: boolean,
    columns: ColumnProps<any>[],
    components?: any;
    dataSource: object[];
    expandable?: any;
    footer?: any;
    loading?: boolean | SpinProps;
    locale?: TableLocale;
    pagination?: false | TablePaginationConfig;
    rowClassName?: (record: any, index: number) => string;
    rowKey?: string | ((record: any) => string);
    rowSelection?: object;
    scroll?: object;
    showHeader?: boolean;
    size?: SizeType;
    summary?: (currentData: any) => React.ReactNode;
    title?: (currentPageData: any) => any;
    onChange?: any;
    onHeaderRow?: any;
    onRow?: any;
    getPopupContainer?: GetPopupContainer;
    sortDirections?: SortOrder[];
}

const components: any = {
    header: {
        cell: ResizeableTitle,
    },
};

const CzTable: React.FC<ICzTableProps> = (props) => {
    const {
        className,
        tableLayout,
        bordered,
        dataSource,
        footer,
        loading,
        expandable,
        locale,
        pagination,
        rowClassName,
        rowKey,
        rowSelection,
        showHeader,
        summary,
        title,
        onChange,
        onHeaderRow,
        onRow,
        getPopupContainer,
        sortDirections
    } = props;

    const [columns, setColumns] = useState([] as ColumnProps<any>[]);
    const [tableY, setTableY] = useState(300);

    useEffect(() => {
        const {columns} = props;
        if (columns && columns.length > 0) {
            setColumns(columns);
        }
    }, [props.columns]);


    useEffect(() => {
        const tableDom: any = document.getElementsByClassName("cz-czTable")[0];
        const tableContent: number = tableDom.offsetHeight - 40 - 57;
        setTableY(tableContent);
    }, []);

    const handleResize = (index: number) => (e: Event, param: any) => {
        const {size} = param;
        const nextColumns = [...columns];
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
        };
        setColumns(nextColumns);
    };

    // /**
    //  * 鼠标右键复制功能的回调函数
    //  * @param data
    //  */
    // handleCopy = (data) => {
    //     message.success("已复制到剪切板")
    // };

    const tableColumns = columns.map((col, index) => {
        // if (col.rightMouseCopy === true) { // 说明要开启鼠标右键复制功能
        //     return {
        //         ...col,
        //         onHeaderCell: column => ({
        //             width: column.width,
        //             onResize: this.handleResize(index),
        //         }),
        //         key: col.dataIndex,
        //         width: col.width ? col.width : 140,
        //         ellipsis: true,
        //         render: (text, record, index) => {
        //             return (
        //                 <Fragment>
        //                     <MenuProvider id={`menu_id_${index}`}
        //                                   style={{
        //                                       overflow: "hidden",
        //                                       textOverflow: 'ellipsis',
        //                                       whiteSpace: "nowrap"
        //                                   }}>
        //
        //                         <Tooltip placement="topLeft" title={text}>
        //                             {text}
        //                         </Tooltip>
        //                     </MenuProvider>
        //                     <Menu id={`menu_id_${index}`}>
        //                         <Item>
        //                             <CopyToClipboard
        //                                 text={text}
        //                                 onCopy={this.handleCopy}
        //                             >
        //                                 <div style={{cursor: "pointer"}}>复制</div>
        //                             </CopyToClipboard>
        //                         </Item>
        //                     </Menu>
        //                 </Fragment>
        //
        //             )
        //         }
        //     }
        // } else {
        //     return {
        //         ...col,
        //         onHeaderCell: column => ({
        //             width: column.width,
        //             onResize: this.handleResize(index),
        //         }),
        //         key: col.dataIndex,
        //         width: col.width ? col.width : 140,
        //         ellipsis: true,
        //     }
        // }
        return {
            ...col,
            onHeaderCell: (column: any): any => ({
                width: column.width,
                onResize: handleResize(index),
            }),
            key: col.dataIndex,
            width: col.width ? col.width : 140,
            ellipsis: col.ellipsis === false ? col.ellipsis : true,
        }
    });

    return (
        <Table
            className={`cz-czTable ${className ? className : ''}`}
            tableLayout={tableLayout}
            bordered={bordered ? bordered : false}
            // @ts-ignore
            columns={tableColumns}
            components={components}
            dataSource={dataSource}
            expandable={expandable}
            footer={footer}
            loading={{
                spinning: loading,
                tip: "加载中，请稍候...",
                size: "large"
            } as SpinProps}
            locale={locale}
            pagination={pagination ? Object.assign(pagination, {
                pageSizeOptions: ['10', '20', '50', '100'],
                showSizeChanger: true,
                showTotal: (total: number, range: number[]): React.ReactElement => {
                    return (
                        <div>
                            合计：<span style={{color: "#49b0ff"}}>{total}</span> 条
                        </div>
                    )
                },
                total: dataSource.length
            }) : false}
            rowClassName={rowClassName}
            rowKey={rowKey}
            rowSelection={rowSelection}
            scroll={{
                x: "max-content",
                y: tableY,
                scrollToFirstRowOnChange: true,
            }}
            showHeader={showHeader}
            summary={summary}
            title={title}
            onChange={onChange}
            onHeaderRow={onHeaderRow}
            onRow={onRow}
            getPopupContainer={getPopupContainer}
            sortDirections={sortDirections}
        />
    )
};

export default CzTable;