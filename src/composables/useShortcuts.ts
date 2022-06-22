export function useShortcuts(ob: Record<string, (ev: KeyboardEvent) => void> = {}): void {
  const evts = Object.fromEntries(Object.entries(ob)
    .map(([key, value]) => [key.toLowerCase(), value]))

  const fn = (ev: KeyboardEvent) => {
    const pressed = []
    if (ev.ctrlKey)
      pressed.push('control')
    if (ev.altKey)
      pressed.push('alt')
    if (ev.shiftKey)
      pressed.push('shift')
    if (ev.key)
      pressed.push(ev.key.toLowerCase())
    const cmd = pressed
      .filter((it, idx, arr) => arr.indexOf(it) === idx)
      .join('+')
    if (evts[cmd])
      evts[cmd](ev)
  }

  onMounted(() => {
    document.addEventListener('keydown', fn)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', fn)
  })
}
