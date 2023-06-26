export function useIconSize() {
  return {
    dynamicSize: size => [size, size * 1.15],
    dynamicAnchor: size => [size / 2, size * 1]
  };
}
