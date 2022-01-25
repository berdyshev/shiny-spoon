import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  createContext,
} from 'react';
import subMonths from 'date-fns/subMonths';

import { MetricsContextValue } from './MetricsContextValue';
import { MetricsStorage } from '../core/MetricsStorage';
import { DateRangeType } from '../types/DateRangeType';

const initialContextValue = {
  dateRange: {
    startDate: subMonths(new Date(), 1),
    endDate: new Date(),
  } as DateRangeType,
  metrics: MetricsStorage.getStoredItems(),
  setDateRange: () => {},
  addNewMetric: () => {},
  removeMetric: () => {},
};

export const MetricsContext =
  createContext<MetricsContextValue>(initialContextValue);

export const MetricsProvider: React.FunctionComponent = ({ children }) => {
  const [dateRange, setDateRange] = useState(initialContextValue.dateRange);
  const [metrics, setMetrics] = useState(MetricsStorage.getStoredItems());

  useEffect(() => {
    MetricsStorage.saveItems(metrics);
  }, [metrics]);

  const addNewMetric = useCallback(
    (newMetric: string) => {
      const metricsSet = new Set(metrics);
      metricsSet.add(newMetric);
      setMetrics(Array.from(metricsSet));
    },
    [metrics, setMetrics]
  );

  const removeMetric = useCallback(
    (valueToRemove: string) => {
      setMetrics(metrics.filter((v) => v !== valueToRemove));
    },
    [metrics, setMetrics]
  );

  const contextValue = useMemo(
    () => ({ dateRange, setDateRange, metrics, addNewMetric, removeMetric }),
    [dateRange, setDateRange, metrics, addNewMetric, removeMetric]
  );

  return (
    <MetricsContext.Provider value={contextValue}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetricsContext = () => useContext(MetricsContext);
