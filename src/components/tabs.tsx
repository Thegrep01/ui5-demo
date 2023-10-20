import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5TabsProps {
  content: {
    name: string;
  };
}

export const UI5Tabs = component$(() => {
  useVisibleTask$(async () => {
    if (isServer) {
      return;
    }

    if (isBrowser) {
      import("@ui5/webcomponents/dist/TabContainer");
      import("@ui5/webcomponents/dist/Tab");
      import("@ui5/webcomponents/dist/TabSeparator");
      import("@ui5/webcomponents/dist/Label");
    }
  });

  return (
    <ui5-tabcontainer fixed>
      <ui5-tab text="Usage">
        <div class="flex justify-between">
          <div class="flex flex-col gap-20 w-full mr-20">
            <div id="intro" class="flex-row flex justify-between w-full">
              <div class="w-96">
                <h2 class="font-black text-lg text-black mb-8 capitalize">
                  intro
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
                  magnam voluptatum cupiditate veritatis in accusamus quisquam.
                </p>
              </div>
              <div>
                <img
                  width="720"
                  height="400"
                  class="w-full h-56 object-cover object-center"
                  src="https://dummyimage.com/720x400"
                  alt="product"
                />
              </div>
            </div>
            <div id="use" class="flex-row flex">
              <div>
                <h2 class="font-black text-lg text-black mb-3">When to use</h2>

                <div class="flex gap-5">
                  <div class="w-64">
                    <p class="border-b-2 border-black mb-9">Do</p>
                    <p>
                      Lorem ipsum dolor sit amet consect adipisicing elit.
                      Possimus magnam voluptatum cupiditate veritatis in
                      accusamus quisquam.
                    </p>
                  </div>
                  <div class="w-64">
                    <p class="border-b-2 border-black mb-9">Don't</p>
                    <p>
                      Lorem ipsum dolor sit amet consect adipisicing elit.
                      Possimus magnam voluptatum cupiditate veritatis in
                      accusamus quisquam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="variants" class="flex-row flex justify-between">
              <div class="w-96">
                <h2 class="font-black text-lg text-black mb-8">Variants</h2>
                <p>
                  Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
                  magnam voluptatum cupiditate veritatis in accusamus quisquam.
                </p>
              </div>
              <div>
                <img
                  width="720"
                  height="400"
                  class="w-full h-56 object-cover object-center"
                  src="https://dummyimage.com/720x400"
                  alt="product"
                />
              </div>
            </div>
          </div>
          <AnchorMenu />
        </div>
      </ui5-tab>
      <ui5-tab text="Code">23213123123</ui5-tab>
    </ui5-tabcontainer>
  );
});

const AnchorMenu = component$(() => {
  const selected = useSignal("intro");
  const links = ["intro", "use", "variants"];

  return (
    <div class="flex flex-col gap-8 w-24">
      <p class="text-black font-bold border-b-2 border-black text-xs">
        On this page
      </p>
      {links.map((link) => {
        return (
          <a
            onClick$={() => {
              selected.value = link;
            }}
            key={`link_${link}`}
            href={`#${link}`}
            class={`text-xs cursor-pointer capitalize ${
              selected.value === link ? "font-bold" : "font-normal"
            }`}
          >
            {link}
          </a>
        );
      })}
    </div>
  );
});

export default {
  component: UI5Tabs,
  name: "UI5Tabs",
  builtIn: true,
  inputs: [
    {
      name: "content",
      type: "object",
      subFields: [
        {
          name: "name",
          type: "string",
          required: true,
        },
      ],
    },
  ],
};
