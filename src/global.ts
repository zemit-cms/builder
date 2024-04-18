import { IList, IButton } from './interfaces';
import { ContentViewMode } from './stores/app';

export const zoomList: IList<number>[] = [
  { title: '25', value: 25, },
  { title: '50', value: 50, },
  { title: '75', value: 75, },
  { title: '100', value: 100, },
  { title: '125', value: 125, },
  { title: '150', value: 150, },
  { title: '200', value: 200, },
  { title: '400', value: 400, },
  { title: '800', value: 800, },
];

export const viewModeList: IButton<ContentViewMode>[] = [
  { value: ContentViewMode.Mobile, icon: 'mdi-cellphone', tooltip: 'Mobile', shortcut: 'alt+m' },
  { value: ContentViewMode.Tablet, icon: 'mdi-tablet', tooltip: 'Tablet', shortcut: 'alt+t' },
  { value: ContentViewMode.Desktop, icon: 'mdi-desktop-mac', tooltip: 'Desktop', shortcut: 'alt+d' },
  { value: ContentViewMode.Fit, icon: 'mdi-fit-to-page-outline', tooltip: 'Fit screen', shortcut: 'alt+f' },
]
