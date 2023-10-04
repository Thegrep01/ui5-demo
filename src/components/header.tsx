import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5HeaderProps {
  title: string;
}

export const UI5Header = component$((props: UI5HeaderProps) => {
  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents-fiori/dist/Bar.js");
      import("@ui5/webcomponents/dist/Label.js");
    }
  });

  return (
    <ui5-bar design="Header">
      <ui5-label id="basic-label">{props.title}</ui5-label>
    </ui5-bar>
  );
});

export default {
  component: UI5Header,
  name: "UI5Header",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Title",
    },
  ],
};
