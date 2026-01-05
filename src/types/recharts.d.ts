// Type declarations to extend Recharts types
// This fixes the "no overload matches this call" errors for stackId and custom label props

import 'recharts';
import { ReactElement } from 'react';

declare module 'recharts' {
  // Extend Line component to accept stackId and custom label
  interface LineProps {
    stackId?: string;
    label?: boolean | ReactElement | ((props: any) => ReactElement);
  }

  // Extend Area component to accept stackId and custom label
  interface AreaProps {
    stackId?: string;
    label?: boolean | ReactElement | ((props: any) => ReactElement);
  }

  // Extend Bar component to accept stackId
  interface BarProps {
    stackId?: string;
  }
}

