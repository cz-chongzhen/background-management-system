import React, {Component} from "react";
import "./CzSplitPanel.less";
import SplitPane from "react-split-pane";

interface ICzSplitPanelProps {
    className?: string,
    split: 'vertical' | 'horizontal',
    left: React.ReactNode,
    right?: React.ReactNode,
    rightTop?: React.ReactNode,
    rightBottom?: React.ReactNode,
    nested?: boolean,
    defaultSize?: number
}

const CzSplitPanel: React.FC<ICzSplitPanelProps> = (props: ICzSplitPanelProps) => {
    const {left, split, right, nested, rightTop, rightBottom, defaultSize} = props;
    return (
        <div className="cz-czSplitPanel">
            {
                nested ?
                    <SplitPane
                        split={split}
                        defaultSize={defaultSize ? defaultSize : 200}
                    >
                        {left}
                        <SplitPane
                            split="horizontal"
                        >
                            {rightTop}
                            {rightBottom}
                        </SplitPane>
                    </SplitPane>
                    :
                    <SplitPane
                        split={split}
                        defaultSize={200}
                    >
                        {left}
                        {right}
                    </SplitPane>
            }
        </div>
    )
};

export default CzSplitPanel;

