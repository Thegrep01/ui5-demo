import { Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { isBrowser, isServer } from "@builder.io/qwik/build";
import { BuilderElement } from "@builder.io/sdk-qwik/types/src/types/element";

export interface UI5CarouselProps {
  components?: {
    label: string;
    url: string;
  }[];
  title: string;
}

export const UI5SideNavigation = component$((props: UI5CarouselProps) => {
  const location = useLocation();
  const nav = useNavigate();

  const collapsed = useSignal(false);

  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents-fiori/dist/SideNavigation.js");
      import("@ui5/webcomponents-fiori/dist/SideNavigationItem.js");
      import("@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js");
      import("@ui5/webcomponents/dist/Icon.js");
      import("@ui5/webcomponents-icons/dist/AllIcons.js");
    }
  });
  return (
    <div class="flex h-screen">
      <ui5-side-navigation collapsed={collapsed} class="h-screen">
        <ui5-side-navigation-item
          icon={!collapsed.value ? "close-command-field" : "open-command-field"}
          text={props.title}
          onClick$={() => (collapsed.value = !collapsed.value)}
        ></ui5-side-navigation-item>
        {!collapsed.value &&
          props.components?.map((link, index) => {
            return (
              <ui5-side-navigation-item
                selected={link.url.includes(location.params.element)}
                key={`components_${index}`}
                text={link.label}
                onClick$={async () => {
                  console.log(
                    "link",
                    link.url.includes(location.params.element)
                  );
                  await nav(link.url);
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
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "components",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "string",
        },
        {
          name: "url",
          type: "url",
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
