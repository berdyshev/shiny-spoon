import { useState, useMemo } from 'react';
import { Popover } from 'react-tiny-popover';
import format from 'date-fns/format';

import { DatePicker } from '../components/DatePicker';
import { useMetricsContext } from './MetricsProvider';

export const DateFilter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { dateRange, setDateRange } = useMetricsContext();
  const buttonLabel = useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${format(dateRange.startDate, 'MMM dd, yyyy')} — ${format(
        dateRange.endDate,
        'MMM dd, yyyy'
      )}`;
    }
    return 'Select a date range';
  }, [dateRange]);

  return (
    <Popover
      isOpen={isVisible}
      positions={['bottom', 'left']}
      align={'end'}
      onClickOutside={() => setIsVisible(false)}
      content={
        <div id="date-filter-popover" aria-labelledby="Date Picker Popover">
          <DatePicker value={dateRange} onChange={setDateRange} />
        </div>
      }
    >
      <button
        aria-expanded={isVisible}
        aria-controls="date-filter-popover"
        tabIndex={0}
        onClick={() => setIsVisible(!isVisible)}
      >
        {buttonLabel}
      </button>
    </Popover>
  );
};
