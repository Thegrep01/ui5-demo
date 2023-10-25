import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import {
  getBuilderSearchParams,
  Content,
  fetchOneEntry,
} from "@builder.io/sdk-qwik";
import { CUSTOM_COMPONENTS } from "~/routes";
import { options } from "..";

export const BUILDER_PUBLIC_API_KEY = "1081fc3ead3540d68ef4330cdac286ad";
export const BUILDER_MODEL = "element-page";

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
  const location = useLocation();

  const component = useResource$<string>(async ({ track }) => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    track(() => location.params.element);
    const response = await fetch(
      `https://4c06-95-67-30-96.ngrok-free.app/api/components?filters[url][$eq]=/elements/${location.params.element}`,
      options
    );
    const res = await response.json();
    return res.data[0];
  });

  // RenderContent uses `content` to
  // render the content of the given model, here a page,
  // of your space (specified by the API Key)
  return (
    <Resource
      value={component}
      onPending={() => <p>Loading...</p>}
      onResolved={(_component) => (
        <Content
          model={BUILDER_MODEL}
          content={content.value}
          data={{ component: _component }}
          apiKey={BUILDER_PUBLIC_API_KEY}
          customComponents={CUSTOM_COMPONENTS}
        />
      )}
    />
  );
});
