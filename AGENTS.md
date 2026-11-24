<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep brand colors and fonts in global semantic tokens and official logo artwork in CDN asset pointers, so identity changes stay consistent across pages.
- Keep the local copy `public/images/marca/angela-logo-circular.webp` (referenced as `site.logoFallback`) in sync with the CDN logo; it is the fallback when the CDN asset cannot load.
- Keep header and footer logo references separate in shared site data, so a footer artwork change does not replace the header artwork.
- The homepage opens with Ângela's portrait bleeding to the left edge and her name set large in Fraunces, with "Ângela" overlapping the photo (outlined in the paper color for legibility). Keep that the single bold element; the rest of the page stays quiet (no tracked all-caps labels, plain photo grid instead of cards). Never display the technical specification board as page content.
- Keep `build` and `build:dev` available and include JavaScript sources in `tsconfig.json`, so the publishing pipeline can validate and bundle the site.
