import { useMemo } from 'react';
import { DateRange } from 'react-date-range';
import subMonths from 'date-fns/subMonths';
import { DateRangeType } from '../types/DateRangeType';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const minDate = subMonths(new Date(), 3);
const today = new Date();

export interface DatePickerProps {
  value: DateRangeType;
  onChange: (value: DateRangeType) => void;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  value,
  onChange,
}) => {
  const ranges = useMemo(() => [{ ...value, key: 'selection' }], [value]);

  return (
    <DateRange
      ranges={ranges}
      onChange={(ranges) => onChange(ranges.selection)}
      minDate={minDate}
      maxDate={today}
      showDateDisplay={false}
    />
  );
};
