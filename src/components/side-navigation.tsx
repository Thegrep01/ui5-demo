import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";

export interface UI5CarouselProps {
  text: string;
  design: string;
}

export const UI5SideNavigation = component$(() => {
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
    <ui5-side-navigation class="h-screen">
      <ui5-side-navigation-item
        text="Home"
        icon="home"
      ></ui5-side-navigation-item>
      <ui5-side-navigation-item text="People" expanded icon="group">
        <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
        <ui5-side-navigation-sub-item text="From Other Teams"></ui5-side-navigation-sub-item>
      </ui5-side-navigation-item>
      <ui5-side-navigation-item
        text="Locations"
        icon="locate-me"
        selected
      ></ui5-side-navigation-item>
      <ui5-side-navigation-item text="Events" icon="calendar">
        <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
        <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
      </ui5-side-navigation-item>
      <ui5-side-navigation-item
        slot="fixedItems"
        text="Useful Links"
        icon="chain-link"
      ></ui5-side-navigation-item>
      <ui5-side-navigation-item
        slot="fixedItems"
        text="History"
        icon="history"
      ></ui5-side-navigation-item>
    </ui5-side-navigation>
  );
});

export default {
  component: UI5SideNavigation,
  name: "UI5SideNavigation",
};
