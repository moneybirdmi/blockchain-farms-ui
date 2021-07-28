import React from 'react';
import { GaugeChart } from 'bizcharts';

const GaugeRate = (props) => {
  const rating = props.score;

  return (
    <GaugeChart
      title={{
        visible: false,
        text: 'Bird Rating',
      }}
      height={250}
      value={rating}
      min={0}
      max={100}
      range={[0, 25, 50, 75, 100]}
      //   rangeStyle ={}
      //   color={["#39B8FF", "#52619B", "#43E089", "#C0EDF3"]}
      // color={["#db7b2b", "#e7b416", "#99c140", "#2dc937"]}
      color={['#AE0707', '#AE0707', '#AE0707', '#AE0707']}
      statistic={{
        visible: true,
        text: rating.toFixed(2),
        color: '#484952',
      }}
    />
  );
};

export default GaugeRate;
