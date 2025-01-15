import NoData from '@common/NoData'

interface Props<T> {
  items: T[]
  render: (items: T[]) => JSX.Element
  emptyMessage?: string
  emptyTextColor?: 'black' | 'white'
}

export default function ConditionalRender<T>({
  items,
  render,
  emptyMessage,
  emptyTextColor
}: Props<T>) {
  return items && items.length === 0 ? (
    <NoData
      message={emptyMessage}
      color={emptyTextColor}
    />
  ) : (
    render(items)
  )
}
