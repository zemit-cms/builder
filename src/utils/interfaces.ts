import { Component } from 'vue'

export enum Mode {
  Edit = 'edit',
  View = 'view',
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

export interface IFieldProps<V> {
  modelValue: V,
  label: string,
  description?: string,
  errorMessage?: string | string[],
}

export interface IFieldListeners<V> {
  'update:modelValue': (value: V) => void,
}

export interface ITab<P = {}> {
  value: string | number,
  label: string | (() => string),
  component: Component
  props?: P
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
  setup?: any,
}
