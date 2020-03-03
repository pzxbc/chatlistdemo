import {Dimensions} from 'react-native'

const DEVICE_SIZE = Dimensions.get('window')

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = DEVICE_SIZE;

export const DESIGN_WIDTH = 375
export const DESIGN_HEIGHT = 667

const [ shortDimension, longDimension ] = DEVICE_WIDTH < DEVICE_HEIGHT ? [DEVICE_WIDTH, DEVICE_HEIGHT] : [DEVICE_HEIGHT, DEVICE_WIDTH]

const widthScale = shortDimension / DESIGN_WIDTH
const heightScale = longDimension / DESIGN_HEIGHT

export const ws = (size: number) => (widthScale * size)
export const vs = (size: number) => (heightScale * size)
export const ms = (size: number, factor: 0.5) => (size + (ws(size) - size) * factor)