// Allow CSS custom properties (--w4-*) inside inline `style` objects.
// The leading `import 'react'` makes this file a module, so the `declare module`
// MERGES into React's CSSProperties instead of replacing the module.
import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
