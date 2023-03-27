import React, { useMemo } from "react";

interface ISliceComponent {
  radius: number;
  amount: number; // 0-1 values
  offset: number; // 0-1 values
  color: string;
}

export function Slice({ amount, offset, color, radius }: ISliceComponent) {
  const circumference = 2 * Math.PI * radius;
  const strokeLength = circumference * amount;
  const spaceLength = circumference - strokeLength;
  const strokeDasharray = `${strokeLength} ${spaceLength}`;
  const circumferenceQuarter = circumference / 4;
  const strokeDashoffset = circumferenceQuarter + circumference * offset * -1;

  return (
    <circle
      cx="50%"
      cy="50%"
      r="25%"
      stroke={color}
      fill="none"
      strokeWidth={radius * 2}
      strokeDasharray={strokeDasharray} // dash gap
      strokeDashoffset={strokeDashoffset}
    ></circle>
  );
}

export type SliceDatum = {
  /**
   * Which color to use
   */
  color: string;
  amount: number;
};

interface IPie {
  viewBoxSize?: number;
  count: number;
  slices: SliceDatum[];
}

export default function Pie({ slices, viewBoxSize = 64, count }: IPie) {
  const radius = useMemo(() => viewBoxSize * 0.25, [viewBoxSize]);
  let sum = 0;
  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      style={{ borderRadius: "50%" }}
    >
      {slices.map((slice, index) => {
        sum += slice.amount;
        return (
          <Slice
            key={index}
            {...{
              radius,
              amount: slice.amount,
              offset: sum - slice.amount,
              color: slice.color,
            }}
          />
        );
      })}
    </svg>
  );
}

export function prepareSlices(slices: SliceDatum[]): SliceDatum[] {
  const values = slices.map((slice) => slice.amount);
  const total = values.reduce((a, b) => a + b, 0);
  return slices.map((slice) => {
    return { color: slice.color, amount: slice.amount / total };
  });
}
