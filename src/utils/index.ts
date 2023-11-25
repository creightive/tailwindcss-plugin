import plugin from "tailwindcss/plugin";

export type BitTailwindPluginOptions = {
  prefix: string
  scaling: number
  neutral: 'slate' | 'gray' | 'mauve' | 'sage' | 'olive' | 'sand'
  accent: 'crimson' | 'lime'
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

type PluginWithOptions = typeof plugin.withOptions<Partial<BitTailwindPluginOptions>>;

export type HandlerParamType = Parameters<PluginWithOptions>[0];
export type ThemeParamType = Parameters<PluginWithOptions>[1];

export const createCustomVariableFromScale = (prefix: string, name: string, scaleObject: Record<string, string>) => {
  let regex = /\d{1,3}\b/g
  const entries = Object.entries(scaleObject)
  return entries.reduce((acc, curr) => {
    // 1. Get scale value (a number) from the key, assumes there's only one match
    const [key, value] = curr
    let [scale] = key.match(regex)
    acc[`--${prefix}-${name}-${scale}`] = value
    return acc
  }, {})
}

export const createCustomVariable = (prefix: string, name: string, value: string | number) => {}
export const getPluginOptions = (partialOptions: Partial<BitTailwindPluginOptions> = {}) => ({
  prefix: partialOptions.prefix ?? 'bw',
  neutral: partialOptions.neutral ?? 'olive',
  accent: partialOptions.accent ?? 'lime',
  radius: partialOptions.radius ?? 'lg',
  scaling: partialOptions.scaling ?? 1,
})
