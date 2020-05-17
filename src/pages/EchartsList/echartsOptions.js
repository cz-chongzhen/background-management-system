export const todaySaleConditionOption = {
    title: {
        text: '销售情况'
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

};