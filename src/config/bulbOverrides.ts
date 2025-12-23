// Editable bulb override map
// Keys are "rowIndex-bulbIndex" matching the layout in `ChristmasTree.tsx`.
// Each entry may be a simple string ('on'|'off'|'auto') or a detailed object:
// { mode?: 'on'|'off'|'auto', brightness?: number, pulse?: boolean, flicker?: boolean, delayMs?: number, color?: string }

export type BulbOverride =
  | 'on'
  | 'off'
  | 'auto'
  | {
      mode?: 'on' | 'off' | 'auto';
      brightness?: number;
      pulse?: boolean;
      flicker?: boolean;
      delayMs?: number;
      color?: string;
    };

const bulbOverrides: Record<string, BulbOverride> = {
  // Example overrides (edit these):
  // '0-0': 'on',   // force first bulb in row 0 on
  // '0-2': 'auto', // default

  //Non-letter Bulbs
    '0-1': 'off',
    '0-3': 'off',
    '1-0': 'off',
    '1-2': 'off',
    '1-4': 'on',
    '2-0': 'off',
    '2-1': 'off',
    '2-3': 'off',
    '2-4': 'off',
    '3-0': 'off',
    '3-2': 'off',
    '3-3': 'off',
    '3-5': 'off',

  //Letters Bulbs
    '0-0': 'on',
    '0-2': 'on',
    '1-1': 'off',
    '1-3': 'off',
    '2-2': 'off',
    '3-1': 'off',
    '3-4': 'off',

};

export default bulbOverrides;
