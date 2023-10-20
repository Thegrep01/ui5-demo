import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  fetchOneEntry,
  getBuilderSearchParams,
  type RegisteredComponent,
  Content,
} from "@builder.io/sdk-qwik";
import UI5Header from "../components/header";
import UI5Carousel from "../components/carousel";
import UI5Input from "../components/input";
import UI5Button from "../components/button";
import UI5SideNavigation from "../components/side-navigation";
import ElementPreview from "../components/element-preview";
import UI5Tabs from "../components/tabs";

export const BUILDER_PUBLIC_API_KEY = "1081fc3ead3540d68ef4330cdac286ad";
export const BUILDER_MODEL = "page";

// Find these components in the Custom Components
// section of the Insert tab of the Visual Editor.
// You can also turn on Components-Only Mode to limit
// editing to only these components.
// https://www.builder.io/c/docs/guides/components-only-mode
export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  UI5Header,
  UI5Carousel,
  UI5Input,
  UI5Button,
  UI5SideNavigation,
  ElementPreview,
  UI5Tabs,
];

// Use Qwik City's `useBuilderContent` to get your content from Builder.
// `routeLoader$()` takes an async function to fetch content
// from Builder with `fetchOneEntry()`.
export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const isPreviewing = url.searchParams.has("builder.preview");

  const builderContent = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  // If there's no content, throw a 404.
  // You can use your own 404 component here
  if (!builderContent && !isPreviewing) {
    throw error(404, "Page not found");
  }
  // return content fetched from Builder, which is JSON
  return builderContent;
});

export default component$(() => {
  const content = useBuilderContent();

  // RenderContent uses `content` to
  // render the content of the given model, here a page,
  // of your space (specified by the API Key)
  return (
    <Content
      model={BUILDER_MODEL}
      content={content.value}
      apiKey={BUILDER_PUBLIC_API_KEY}
      customComponents={CUSTOM_COMPONENTS}
    />
  );
});
