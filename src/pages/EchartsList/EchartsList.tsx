import React, {useRef} from "react";
import "./EchartsList.less";
import ReactEcharts from 'echarts-for-react';
import * as echartsOptions from "./echartsOptions";

const EchartsList: React.FC = () => {
    const chart = useRef();

    return (
        <div className="cz-echartsList">
            <ReactEcharts
                option={echartsOptions.todaySaleConditionOption}
                // @ts-ignore
                ref={chart}
            />
        </div>
    )
};

export default EchartsList;