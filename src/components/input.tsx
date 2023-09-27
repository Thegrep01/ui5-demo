import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5CarouselProps {
  images: { image: string }[];
}

const UI5Input = component$((props: UI5CarouselProps) => {
  console.log(props.images);
  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents/dist/Input.js");
    }
  });

  return <ui5-input id="input-16" value="Input"></ui5-input>;
});

export default {
  component: UI5Input,
  name: "UI5Input",
  inputs: [],
};
