import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5HeaderProps {
  logo: string;
  navigation?: {
    label: string;
    url: string;
  }[];
}

export const UI5Header = component$((props: UI5HeaderProps) => {
  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents-fiori/dist/Bar.js");
      import("@ui5/webcomponents/dist/Label");
    }
  });

  return (
    <ui5-bar design="Header">
      <img width="92" height="45" slot="startContent" src={props.logo} />
      <div slot="endContent">
        {props.navigation?.map((link, index) => {
          return (
            <Link key={`header_${index}`} href={link.url}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </ui5-bar>
  );
});

// <Link key={`header_${index}`} href={link.url}>
//   {link.label}
// </Link>

export default {
  component: UI5Header,
  name: "UI5Header",
  inputs: [
    {
      name: "logo",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      required: true,
      defaultValue:
        "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
    },
    {
      name: "navigation",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "url",
          required: true,
        },
      ],
    },
  ],
};
