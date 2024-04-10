export interface IList<T> {
  title: string,
  value: T
}

export interface IButton<T> {
  label?: string,
  icon?: string,
  tooltip?: string,
  divider?: boolean,
  spacer?: boolean,
  onClick?: (props?: T) => void,
  active?: () => boolean,
  disabled?: () => boolean,
}
