"use client";
import { useEffect } from "react";

import { optimizeImage } from "@/common/lib/optimizeImage";

import { Button } from "@/common/components/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import { useMoveImage } from "../../hooks/useMoveImage";

const ImagePicker = () => {
  const { setMoveImage } = useMoveImage();

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of items) {
          if (item.type.includes("image")) {
            const file = item.getAsFile();
            if (file)
              optimizeImage(file, (uri) => setMoveImage({ base64: uri }));
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [setMoveImage]);

  const handleImageInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", () => {
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];
        optimizeImage(file, (uri) => setMoveImage({ base64: uri }));
      }
    });
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleImageInput}>
      <ImageIcon />
    </Button>
  );
};

export default ImagePicker;
