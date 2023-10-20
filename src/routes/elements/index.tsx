import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  getContent,
  RenderContent,
  getBuilderSearchParams,
} from "@builder.io/sdk-qwik";
import { CUSTOM_COMPONENTS } from "..";

export const BUILDER_PUBLIC_API_KEY = "1081fc3ead3540d68ef4330cdac286ad";
export const BUILDER_MODEL = "elements";

export default component$(() => {
  const location = useLocation();

  const builderContentRsrc = useResource$<any>(() => {
    return getContent({
      model: BUILDER_MODEL,
      apiKey: BUILDER_PUBLIC_API_KEY,
      options: getBuilderSearchParams(location.query),
      userAttributes: {
        urlPath: location.pathname || "/",
      },
    });
  });

  return (
    <Resource
      value={builderContentRsrc}
      onPending={() => <div>Loading...</div>}
      onResolved={(content) => (
        <RenderContent
          model={BUILDER_MODEL}
          content={content}
          apiKey={BUILDER_PUBLIC_API_KEY}
          customComponents={CUSTOM_COMPONENTS}
        />
      )}
    />
  );
});
