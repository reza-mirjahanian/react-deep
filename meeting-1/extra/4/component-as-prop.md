If I  _had to_  extract some general rules of which pattern should be used where, I’d probably go with something like
this:

- I’d use “component as an Element” pattern (`<Button icon={<Icon />} />`) for cases, where I just need to render the
  component in a pre-defined place, without modifying its props in the “receiving” component.
- I’d use “component as a Component” pattern (`<Button Icon={Icon} />`) when I need to heavily modify and customise this
  component on the “receiving” side through its props, while at the same time allowing users full flexibility to
  override those props themselves (pretty much as  [react-select](https://react-select.com/components)  does
  for  `components`  prop).
- I’d use “component as a Function” pattern (`<Button renderIcon={() => <Icon />} />`) when I need the consumer to
  modify the result of this function, depending on some values coming from the “host” component itself (pretty much
  what  [Material UI Data Grid](https://mui.com/components/data-grid/columns/#render-cell)  component does
  with  `renderCell`  prop)
