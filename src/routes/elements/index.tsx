import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  getBuilderSearchParams,
  Content,
  fetchOneEntry,
} from "@builder.io/sdk-qwik";
import { CUSTOM_COMPONENTS } from "..";

export const BUILDER_PUBLIC_API_KEY = "1081fc3ead3540d68ef4330cdac286ad";
export const BUILDER_MODEL = "elements";
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

export const options = {
  method: "GET",
  headers: {
    Authorization:
      "bearer 1652e774ef69789a0d5519b753e2c920d2b9c6e382eabfec991c33b629c6290b4da512be68340b13f706f742d90236f1c4a1b59ff3ab716eaff81b9781989baf9bc0d341f4bf8ed73f1bfb5f2f0cf03708bc8d2277165f731db1670307d68afffeaa76fc2d620e9684e6eb62d46f3ef573ce55bfd390f6ad6e89f779d9dc3ae7",
  },
};

export default component$(() => {
  const content = useBuilderContent();

  const components = useResource$<string>(async ({ track }) => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    track(() => "components");
    const response = await fetch(
      `https://4c06-95-67-30-96.ngrok-free.app/api/components`,
      options
    );
    const data = await response.json();
    return data;
  });

  // RenderContent uses `content` to
  // render the content of the given model, here a page,
  // of your space (specified by the API Key)
  return (
    <Resource
      value={components}
      onPending={() => <p>Loading...</p>}
      onResolved={(_components) => (
        <Content
          model={BUILDER_MODEL}
          content={content.value}
          data={{ components: _components }}
          apiKey={BUILDER_PUBLIC_API_KEY}
          customComponents={CUSTOM_COMPONENTS}
        />
      )}
    />
  );
});
