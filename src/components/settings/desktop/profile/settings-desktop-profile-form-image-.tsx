"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./settings-desktop-profile-form";

type Images = {
  value: string;
  label: string;
};

export const images: Images[] = [
  {
    value: "couple01.jpeg",
    label: "Couple 01",
  },
  {
    value: "notepad01.jpeg",
    label: "Notepad 01",
  },
  {
    value: "notepad02.jpeg",
    label: "Notepad 02",
  },
  {
    value: "notepad03.jpeg",
    label: "Notepad 03",
  },
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
  {
    value: "girl01.jpeg",
    label: "Girl 01",
  },
  {
    value: "girl02.jpeg",
    label: "Girl 02",
  },
  {
    value: "girl03.jpeg",
    label: "Girl 03",
  },
  {
    value: "girl04.jpeg",
    label: "Girl 04",
  },
  {
    value: "girl05.jpeg",
    label: "Girl 05",
  },
];

type SettingsDesktopProfileFormImageProps = {
  field: ControllerRenderProps<any>;
  form: UseFormReturn<ProfileFormValues>;
  isLoading: boolean;
  data: {
    user: any;
    session: any;
  };
};

export default function SettingsDesktopProfileFormImage({
  field,
  form,
  isLoading,
  data,
}: SettingsDesktopProfileFormImageProps) {
  const [selectedImg, setSelectedImg] = useState<Images>(
    images.find((img) => img.value === form.getValues("avatar").value) as Images
  );

  useEffect(() => {
    const avatarValue = form.getValues("avatar").value;
    const imageFromDb = images.find((img) => img.value === avatarValue);
    if (imageFromDb) {
      setSelectedImg(imageFromDb);
    }
  }, [isLoading, data, form]);

  function changeImage(img: Images) {
    setSelectedImg(img);
    form.setValue("avatar", {
      value: img.value,
    });
  }

  function handleChangeRight() {
    const currentIndex = images.findIndex(
      (img) => img.value === selectedImg?.value
    );
    if (currentIndex === images.length - 1) {
      changeImage(images[0]);
    } else {
      changeImage(images[currentIndex + 1]);
    }
  }

  function handleChangeLeft() {
    const currentIndex = images.findIndex(
      (img) => img.value === selectedImg?.value
    );
    if (currentIndex === 0) {
      changeImage(images[images.length - 1]);
    } else {
      changeImage(images[currentIndex - 1]);
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
      <Avatar
        className={`h-1/4 w-1/4 border-[3px] ${
          selectedImg?.value === data?.user?.avatar
            ? "border-purple-700"
            : "border-black"
        }`}
      >
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
