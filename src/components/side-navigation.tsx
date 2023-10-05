import { Slot, component$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { isBrowser, isServer } from "@builder.io/qwik/build";
import { BuilderElement } from "@builder.io/sdk-qwik/types/src/types/element";

export interface UI5CarouselProps {
  links?: {
    label: string;
    url: string;
  }[];
}

export const UI5SideNavigation = component$((props: UI5CarouselProps) => {
  const location = useLocation();
  const nav = useNavigate();

  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents-fiori/dist/SideNavigation.js");
      import("@ui5/webcomponents-fiori/dist/SideNavigationItem.js");
      import("@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js");
    }
  });

  return (
    <div class="flex h-screen">
      <ui5-side-navigation class="h-screen">
        {props.links?.map((link, index) => {
          return (
            <ui5-side-navigation-item
              selected={location.params.component === link.label.toLowerCase()}
              text={link.label}
              key={`link_${index}`}
              onClick$={async () => {
                await nav(`/components/${link.url}`);
              }}
            ></ui5-side-navigation-item>
          );
        })}
      </ui5-side-navigation>
      <div class="flex-1">
        <Slot />
      </div>
    </div>
  );
});

export default {
  component: UI5SideNavigation,
  name: "UI5SideNavigation",
  builtIn: true,
  inputs: [
    {
      name: "links",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "string",
        },
        {
          name: "url:",
          type: "url:",
        },
      ],
    },
  ],
  defaultChildren: [
    {
      "@type": "@builder.io/sdk:Element",
      component: { name: "Text", options: { text: "I am child text block!" } },
    } as BuilderElement,
  ],
};
