"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

type Images = {
  value: string;
  label: string;
};

const images: Images[] = [
  {
    value: "boy01.jpeg",
    label: "Boy 01",
  },
  {
    value: "boy02.jpeg",
    label: "Boy 02",
  },
  {
    value: "boy03.jpeg",
    label: "Boy 03",
  },
  {
    value: "men01.jpeg",
    label: "Men 01",
  },
  {
    value: "men02.jpeg",
    label: "Men 02",
  },
];

type SettingsMobileProfileFormImageProps = {
  field: ControllerRenderProps<any>;
};

export default function SettingsMobileProfileFormImage({
  field,
}: SettingsMobileProfileFormImageProps) {
  const [selectedImg, setSelectedImg] = useState<Images | null>(images[4]);

  function handleChangeRight() {
    const currentIndex = images.findIndex(
      (img) => img.value === selectedImg?.value
    );
    if (currentIndex === images.length - 1) {
      setSelectedImg(images[0]);
    } else {
      setSelectedImg(images[currentIndex + 1]);
    }
  }

  function handleChangeLeft() {
    const currentIndex = images.findIndex(
      (img) => img.value === selectedImg?.value
    );
    if (currentIndex === 0) {
      setSelectedImg(images[images.length - 1]);
    } else {
      setSelectedImg(images[currentIndex - 1]);
    }
  }

  return (
    <div className="flex justify-center items-center space-x-4">
      <div>
        <Button
          onClick={handleChangeLeft}
          type="button"
          variant={"outline"}
          className="p-2"
        >
          <ChevronLeft className="w-7 h-7" />
        </Button>
      </div>
      <Avatar className="h-1/2 w-1/2 border-2 border-black">
        <AvatarImage src={`/api/static/img/${selectedImg?.value}`} />
        <AvatarFallback className="text-[5rem]">IMG</AvatarFallback>
      </Avatar>
      <div>
        <Button
          onClick={handleChangeRight}
          type="button"
          variant={"outline"}
          className="p-2"
        >
          <ChevronRight className="w-7 h-7" />
        </Button>
      </div>
      <Input type="hidden" {...field} />
    </div>
  );
}
