export enum BuilderWidgetType {
  Text = 'text',
  Image = 'image',
}

export enum Mode {
  Edit = 'edit',
  View = 'view',
}

export interface IBuilder {
  name: string,
  version: string,
  widgets: IBuilderWidget[],
}

export interface IBuilderWidget {
  id?: string,
  type: BuilderWidgetType,
  children: IBuilderWidget[],
}

export enum CSSUnit {
  RelativeToFontSize = 'em',
  RelativeToRootFontSize = 'rem',
  RelativeToViewportWidth = 'vw',
  RelativeToViewportHeight = 'vh',
  RelativeToViewportMin = 'vmin',
  RelativeToViewportMax = 'vmax',
  Pixel = 'px',
  Percentage = '%',
  Centimeter = 'cm',
  Millimeter = 'mm',
  Inch = 'in',
  Point = 'pt',
}

export interface ICSSUnit {
  format: CSSUnit,
  value: number,
}

export interface IList<T> {
  title: string | (() => string),
  value: T
}

export interface IButton<T> {
  value?: T,
  label?: string | (() => string),
  icon?: string | (() => string),
  tooltip?: string | (() => string),
  divider?: boolean | (() => boolean),
  spacer?: boolean | (() => boolean),
  onClick?: (props?: any) => void,
  active?: boolean | (() => boolean),
  disabled?: boolean | (() => boolean),
  shortcut?: string | string[],
}
