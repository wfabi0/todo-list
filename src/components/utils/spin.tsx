type SpinUtilProps = {
  size?: string;
  color?: string;
};

export default function SpinUtil({ size, color }: SpinUtilProps) {
  size = size || "14";
  color = color || "border-purple-400";
  return (
    <div
      className={`animate-spin rounded-full border-t-4 border-solid w-${size} h-${size} ${color}`}
    />
  );
}
