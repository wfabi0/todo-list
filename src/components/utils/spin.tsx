type SpinUtilProps = {
  size?: string;
  color?: string;
};

const sizeClassMap: { [key: string]: string } = {
  "1": "w-1 h-1",
  "2": "w-2 h-2",
  "3": "w-3 h-3",
  "4": "w-4 h-4",
  "5": "w-5 h-5",
  "6": "w-6 h-6",
  "7": "w-7 h-7",
  "8": "w-8 h-8",
  "9": "w-9 h-9",
  "10": "w-10 h-10",
  "12": "w-12 h-12",
  "14": "w-14 h-14",
  "16": "w-16 h-16",
  "20": "w-20 h-20",
  "24": "w-24 h-24",
};

export default function SpinUtil({ size, color }: SpinUtilProps) {
  color = color || "border-purple-400";
  const sizeClass = sizeClassMap[size || "14"] || "w-14 h-14";
  return (
    <div
      className={`${sizeClass} animate-spin rounded-full border-t-4 border-solid ${color}`}
    />
  );
}
