// Type declarations to extend Recharts types
// This fixes the "no overload matches this call" errors for stackId and custom label props

import 'recharts';
import { ReactElement } from 'react';

interface LabelProps {
  x?: number;
  y?: number;
  payload?: {
    value?: number | string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

declare module 'recharts' {
  // Extend Line component to accept stackId and custom label
  interface LineProps {
    stackId?: string;
    label?: boolean | ReactElement | ((props: LabelProps) => ReactElement);
  }

  // Extend Area component to accept stackId and custom label
  interface AreaProps {
    stackId?: string;
    label?: boolean | ReactElement | ((props: LabelProps) => ReactElement);
  }

  // Extend Bar component to accept stackId
  interface BarProps {
    stackId?: string;
  }
}

