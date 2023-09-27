import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5CarouselProps {
  images: { image: string }[];
}

const UI5Carousel = component$((props: UI5CarouselProps) => {
  console.log(props.images);
  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents/dist/Carousel.js");
    }
  });

  return (
    <ui5-carousel cyclic>
      {props.images.map((image, index) => {
        return (
          <img
            width={400}
            height={1000}
            key={`img_${index}`}
            src={image.image}
          />
        );
      })}
    </ui5-carousel>
  );
});

export default {
  component: UI5Carousel,
  name: "UI5Carousel",
  inputs: [
    {
      name: "images",
      type: "list",
      allowedFileTypes: ["jpeg", "png"],
      subFields: [
        {
          name: "image",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          required: true,
          defaultValue:
            "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
        },
      ],
    },
  ],
};
