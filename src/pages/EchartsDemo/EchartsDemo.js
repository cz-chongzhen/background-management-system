import React, {Component} from "react";
import ReactEcharts from 'echarts-for-react';
import {Button} from "antd";
import CzTable from "../../components/CzTable/CzTable";

class EchartsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: '测试echarts'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ["用电量"]
                },
                xAxis: {
                    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                },
                yAxis: {
                    type: 'value'
                },
                grid: {
                    containLabel: true
                },
                textStyle: {
                    color: '#000'
                },
                color: ["#3296fa"],
                series: {
                    type: "bar",
                    data: [1000, 2000, 3400, 4400, 3200, 1800, 7800]
                }

            }
        }
    }

    changeCLick = () => {
        this.state.options.color[0] = "#000";
        this.state.options.title.text = "惠思雨";
        this.charts.getEchartsInstance().setOption(this.state.options)
    };

    render() {
        return (
            <div className="EchartsDemo">
                <Button onClick={this.changeCLick}>变化</Button>
                <ReactEcharts
                    option={this.state.options}
                    ref={c => {
                        this.charts = c
                    }}
                />
            </div>
        );
    }
}

export default EchartsDemo;