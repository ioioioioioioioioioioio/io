import { groupBy } from 'lodash';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import useTheme from '../colors/Colors';
import { useAppSelector } from '../redux/hooks';
import { selectEntries } from '../redux/slices/entrySlice';

const displayDate = (n: number) => n.toLocaleString('en-US', { minimumIntegerDigits: 2 });

// Example use:
// `<Chart begin={new Date('2021-01-01')} end={new Date('2021-01-010')} />`
export default ({ begin, end }: { begin: Date; end: Date }) => {
  const days = React.useMemo(() => {
    const days = [];
    for (const d = new Date(begin); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }, [begin, end]);

  const entries = useAppSelector((state) =>
    selectEntries(state).filter((e) => begin <= e.date && e.date <= end)
  );

  const data = React.useMemo(() => {
    const entriesByDay = groupBy(entries, (e) => e.date.toDateString());

    return days.map((day) =>
      (entriesByDay[day.toDateString()] ?? [{ amount: 0 }])
        .map((e) => e.amount)
        .reduce((a, b) => a + b)
    );
  }, [days, entries]);

  const labels = React.useMemo(
    () => days.map((d) => `${displayDate(d.getDate())}-${displayDate(d.getMonth() + 1)}`),
    [days]
  );

  const hidden: number[] = React.useMemo(
    () => data.map((v, i) => (v === 0 ? i : undefined)).filter((v) => v !== undefined) as any,
    [data]
  );

  const theme = useTheme();
  return (
    <View>
      <LineChart
        hidePointsAtIndex={hidden}
        data={{
          labels,
          datasets: [{ data }],
        }}
        width={Dimensions.get('window').width}
        height={300}
        verticalLabelRotation={45}
        chartConfig={{
          backgroundColor: theme.backgroundPrimary,
          color: () => theme.primary,
          labelColor: () => theme.textSecondary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: theme.accent,
          },
        }}
        bezier
      />
    </View>
  );
};
