import { getImageFileAspectRatio, selectLocalImages } from "@/helpers/utils.ts";
import { RichText } from "@atproto/api";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { enrichTweet } from "react-tweet";
import type { Tweet } from "react-tweet/api";

const MAX_IMAGE_LENGTH = 4;

export interface PostForm {
  text: string;
  images: {
    alt: string;
    file: File;
    aspectRatio: { width: number; height: number };
    objectUrl: string;
  }[];
}

const defaultValues: PostForm = {
  text: "",
  images: [],
};

export const usePostForm = (tweet: Tweet | undefined) => {
  const postFormMethods = useForm<PostForm>({
    defaultValues,
  });

  useEffect(() => {
    if (!tweet) {
      return;
    }

    const enrichedTweet = enrichTweet(tweet);
    const text = enrichedTweet.entities.map(({ text }) => text).join("");

    postFormMethods.setValue("text", text);

    const imagesPromise = enrichedTweet.mediaDetails?.flatMap((media) => {
      if (media.type !== "photo") {
        return [];
      }

      return fetch(media.media_url_https)
        .then((res) => res.blob())
        .then(async (blob) => {
          const file = new File([blob], media.display_url, { type: blob.type });

          return {
            alt: media.ext_alt_text ?? "",
            file,
            aspectRatio: {
              width: media.sizes.large.w,
              height: media.sizes.large.h,
            },
            objectUrl: URL.createObjectURL(file),
          };
        });
    });
    Promise.all(imagesPromise ?? []).then((images) => {
      postFormMethods.setValue("images", images);
    });
  }, [tweet]);

  return {
    ...postFormMethods,
  };
};

export const usePostFormContext = () => {
  const formMethods = useFormContext<PostForm>();
  const imagesField = useFieldArray({
    control: formMethods.control,
    name: "images",
  });

  const textValue = formMethods.watch("text");
  const imagesValue = formMethods.watch("images");
  const hasMaxImages = MAX_IMAGE_LENGTH <= imagesField.fields.length;

  const graphemeLength = useMemo(
    () => new RichText({ text: textValue }).graphemeLength,
    [textValue],
  );

  const isFormValid = useMemo(() => {
    return 0 < textValue.length || 0 < imagesValue.length;
  }, [textValue, imagesValue]);

  const getImages = () => {
    return formMethods.getValues("images");
  };

  const onAddImage = async () => {
    const addedImageFiles = await selectLocalImages();
    if (!addedImageFiles) {
      return;
    }

    const addedImagesPromise = addedImageFiles.map(async (file) => {
      return {
        alt: "",
        file,
        aspectRatio: await getImageFileAspectRatio(file),
        objectUrl: URL.createObjectURL(file),
      };
    });
    const addedImages = await Promise.all(addedImagesPromise);

    const current = getImages();
    imagesField.replace([...current, ...addedImages].slice(0, 4));
  };

  const onRemoveImage = (index: number) => {
    const target = getImages()[index];
    URL.revokeObjectURL(target.objectUrl);
    imagesField.remove(index);
  };

  return {
    hasMaxImages,
    graphemeLength,
    onAddImage,
    onRemoveImage,
    form: formMethods,
    imagesField,
    isFormValid,
  };
};
