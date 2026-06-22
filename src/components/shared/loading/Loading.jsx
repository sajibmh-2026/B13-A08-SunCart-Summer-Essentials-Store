"use client";

import Lottie from "lottie-react";

const spinnerAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Sun Spinner",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Ray 1",
      sr: 1,
      ks: {
        o: { a: 0, k: 60 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 60 }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sr",
              d: 1,
              sy: 2,
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              pt: { a: 0, k: 8 },
              or: { a: 0, k: 60 },
              os: { a: 0, k: 0 },
              ir: { a: 0, k: 40 },
              is: { a: 0, k: 0 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.96, 0.62, 0.04, 1] },
              o: { a: 0, k: 100 },
            },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [110, 110] },
            { t: 15, s: [110, 110], e: [100, 100] },
            { t: 30, s: [100, 100], e: [100, 100] },
            { t: 60 },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          d: 1,
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [60, 60] },
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.96, 0.62, 0.04, 1] },
          o: { a: 0, k: 100 },
        },
      ],
    },
  ],
};

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Lottie
        animationData={spinnerAnimation}
        style={{ width: 150, height: 150 }}
        loop
        autoplay
      />
      <p className="mt-2 text-gray-500 text-sm animate-pulse">
        Loading summer vibes...
      </p>
    </div>
  );
}
