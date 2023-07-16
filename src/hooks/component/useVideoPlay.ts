import { buildUUID } from '@/utils/uuid'

interface VideoInfo {
  id: string
  index: number
  active: boolean
  x: number
  y: number
  h: number
  w: number
}

const width = (window.innerWidth * 3) / 4
const height = (width * 9) / 16
let videoList: VideoInfo[] = [
  {
    id: buildUUID(),
    index: 0,
    active: false,
    x: 0,
    y: 0,
    w: width,
    h: height
  }
]

function setHeight(width: number): number {
  return (width * 9) / 16
}

function getVideoList() {
  return videoList
}

function setVideoList(split) {
  const w12 = width / 2
  const h12 = setHeight(w12)
  const w23 = width * (2 / 3)
  const h23 = setHeight(w23)
  const w13 = width * (1 / 3)
  const h13 = setHeight(w13)
  const w34 = width * (3 / 4)
  const h34 = setHeight(w34)
  const w14 = width * (1 / 4)
  const h14 = setHeight(w14)
  switch (split) {
    case 1:
      videoList = [
        {
          id: buildUUID(),
          index: 0,
          active: false,
          x: 0,
          y: 0,
          w: width,
          h: height
        }
      ]
      break
    case 4:
      videoList = [
        {
          id: buildUUID(),
          index: 0,
          active: false,
          x: 0,
          y: 0,
          h: h12,
          w: w12
        },
        {
          id: buildUUID(),
          index: 1,
          active: false,
          x: w12,
          y: 0,
          w: w12,
          h: h12
        },
        {
          id: buildUUID(),
          index: 2,
          active: false,
          x: 0,
          y: h12,
          w: w12,
          h: h12
        },
        {
          id: buildUUID(),
          index: 3,
          active: false,
          x: w12,
          y: h12,
          w: w12,
          h: h12
        }
      ]
      break
    case 6:
      videoList = [
        {
          id: buildUUID(),
          index: 0,
          active: false,
          x: 0,
          y: 0,
          w: w23,
          h: h23
        },
        {
          id: buildUUID(),
          index: 1,
          active: false,
          x: w23,
          y: 0,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 2,
          active: false,
          x: w23,
          y: h13,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 3,
          active: false,
          x: w23,
          y: h13 * 2,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 4,
          active: false,
          x: w13,
          y: h23,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 5,
          active: false,
          x: 0,
          y: h23,
          w: w13,
          h: h13
        }
      ]
      break
    case 8:
      videoList = [
        {
          id: buildUUID(),
          index: 0,
          active: false,
          x: 0,
          y: 0,
          w: w34,
          h: h34
        },
        {
          id: buildUUID(),
          index: 1,
          active: false,
          x: w34,
          y: 0,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 2,
          active: false,
          x: w34,
          y: h14,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 3,
          active: false,
          x: w34,
          y: h14 * 2,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 4,
          active: false,
          x: w34,
          y: h14 * 3,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 5,
          active: false,
          x: w14 * 2,
          y: h34,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 6,
          active: false,
          x: w14,
          y: h34,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 7,
          active: false,
          x: 0,
          y: h34,
          w: w14,
          h: h14
        }
      ]
      break
    case 9:
      videoList = [
        {
          id: buildUUID(),
          index: 0,
          active: false,
          x: 0,
          y: 0,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 1,
          active: false,
          x: w13,
          y: 0,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 2,
          active: false,
          x: w13 * 2,
          y: 0,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 3,
          active: false,
          x: 0,
          y: h13,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 4,
          active: false,
          x: w13,
          y: h13,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 5,
          active: false,
          x: w13 * 2,
          y: h13,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 6,
          active: false,
          x: 0,
          y: h13 * 2,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 7,
          active: false,
          x: w13,
          y: h13 * 2,
          w: w13,
          h: h13
        },
        {
          id: buildUUID(),
          index: 8,
          active: false,
          x: w13 * 2,
          y: h13 * 2,
          w: w13,
          h: h13
        }
      ]
      break
    case 16:
      videoList = [
        {
          id: buildUUID(),
          index: 0,
          active: false,
          x: 0,
          y: 0,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 1,
          active: false,
          x: w14,
          y: 0,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 2,
          active: false,
          x: w14 * 2,
          y: 0,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 3,
          active: false,
          x: w14 * 3,
          y: 0,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 4,
          active: false,
          x: 0,
          y: h14,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 5,
          active: false,
          x: w14,
          y: h14,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 6,
          active: false,
          x: w14 * 2,
          y: h14,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 7,
          active: false,
          x: w14 * 3,
          y: h14,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 8,
          active: false,
          x: 0,
          y: h14 * 2,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 9,
          active: false,
          x: w14,
          y: h14 * 2,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 10,
          active: false,
          x: w14 * 2,
          y: h14 * 2,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 11,
          active: false,
          x: w14 * 3,
          y: h14 * 2,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 12,
          active: false,
          x: 0,
          y: h14 * 3,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 13,
          active: false,
          x: w14,
          y: h14 * 3,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 14,
          active: false,
          x: w14 * 2,
          y: h14 * 3,
          w: w14,
          h: h14
        },
        {
          id: buildUUID(),
          index: 15,
          active: false,
          x: w14 * 3,
          y: h14 * 3,
          w: w14,
          h: h14
        }
      ]
      break
    default:
      break
  }
  return videoList
}

export { getVideoList, setVideoList, width, height, VideoInfo }
