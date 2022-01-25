import { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { Button } from '../components/Button';
import { MetricsMenu } from '../components/MetricsMenu';
import { useMetricsContext } from './MetricsProvider';

export const AddMetricButton: React.FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { metrics, addNewMetric } = useMetricsContext();
  return (
    <Popover
      isOpen={isVisible}
      positions={['bottom', 'left']}
      align="end"
      onClickOutside={() => setIsVisible(false)}
      content={
        <div id="metrics-menu" aria-labelledby="Add metrics menu">
          <MetricsMenu metrics={metrics} onClick={addNewMetric} />
        </div>
      }
    >
      <Button
        aria-expanded={isVisible}
        aria-controls="metrics-menu"
        tabIndex={1}
        onClick={() => setIsVisible(!isVisible)}
      >
        + Add Chart
      </Button>
    </Popover>
  );
};
