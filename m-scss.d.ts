declare module '*.m.scss' {
  const classes: { readonly [classNames: string]: string }
  export = classes
}