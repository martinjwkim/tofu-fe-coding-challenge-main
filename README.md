# Tofu Frontend Coding challenge

Built with [Next.js](https://nextjs.org/).

## For local dev

```commandline
yarn
yarn run dev
```

The app will be available at http://localhost:3000/

---

## Changelog

- Refactored content fetching and type definitions
- Components now use shaped data structures for content and campaigns
- Updated CSS so selected components are properly highlighted and numbered
- List of selected components with index, text preview, and remove icon 
- Updated page CSS to take full height of page and fix left sidebar vertical scrolling issue
- Personalized text variations applied in the iframe
- Settings component extended with content generation functionality
- Updated API route: Logic updated to fully replace components instead of merging
- Selected target is now persisted across page refresh (settings component)
