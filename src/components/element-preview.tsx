import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface ElementPreviewProps {
  name: string;
  url: string;
}

const ElementPreview = component$((props: ElementPreviewProps) => {
  return (
    <Link href={`${props.url}`}>
      <div>
        <div class="bg-gray-200 rounded-3xl h-60 w-60"></div>
        <p class="mt-14 text-center">{props.name}</p>
      </div>
    </Link>
  );
});

export default {
  component: ElementPreview,
  name: "ElementPreview",
  inputs: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "url",
      required: true,
    },
  ],
};
