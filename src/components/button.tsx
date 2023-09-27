import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5CarouselProps {
  text: string;
  design: string;
}

const UI5Button = component$((props: UI5CarouselProps) => {
  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents/dist/Button");
    }
  });

  return <ui5-button design={props.design}>{props.text}</ui5-button>;
});

export default {
  component: UI5Button,
  name: "UI5Button",
  inputs: [
    {
      name: "text",
      type: "string",
      defaultValue: "Button",
    },
    {
      name: "design",
      type: "string",
      enum: [
        "Default",
        "Emphasized",
        "Positive",
        "Negative",
        "Transparent",
        "Attention",
      ],
    },
  ],
};
