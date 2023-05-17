import { defaultProviders } from "react-tiny-oembed";

export const oEmbedProviders = defaultProviders.filter(
  (provider) =>
    provider.provider_name === "Vimeo" || provider.provider_name === "YouTube"
);