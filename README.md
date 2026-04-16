# real-estate-booking-fe

A platform where users can browse property listings, read reviews, and book a visit. Built as a single-page application with a focus on clean architecture and minimal custom styling.

> **Note:** The property purchase flow is under consideration and not yet part of the scope.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Routing | React Router v6 |
| Data fetching | TanStack React Query |
| Styling | Bootstrap 5 (utility-first, minimal custom CSS) |

---

## Getting started

After cloning the repository, install dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

To run the linter:

```bash
npm run lint
```

---


## Branching strategy

This project uses two long-lived branches:

| Branch        | Purpose                                                 |
|---------------|---------------------------------------------------------|
| `development` | Active development - all work goes here                 |
| `main`        | Stable/production-ready code - never pushed to directly |

Always push your work to `development`. `main` is updated only via merges from `development` when a release is ready.

```bash
git checkout dev       # make sure you're on dev
git pull               # sync with remote before starting
# ... make your changes ...
git push origin dev    # push to dev, never to main
``` 

---


## Branch naming

When working on a feature or a fix, create a short-lived branch off `development` following this pattern:

```
feat/PRO-123-short-description
fix/PRO-456-short-description
```

| Prefix | When to use | Example |
|---|---|---|
| `feat/` | Adding new functionality | `feat/PRO-123-property-search` |
| `fix/` | Fixing a bug | `fix/PRO-456-booking-form-validation` |

```bash
git checkout development
git pull
git checkout -b feat/PRO-123-property-filters   # branch off development
# ... do your work ...
git push origin feat/PRO-123-property-filters   # open a PR into development when ready
```

Keep branch names lowercase and use hyphens between words.
 

---

## Folder structure

```
src/
├── api/               # apiClient and constants (BASE_URL, headers)
├── assets/            # Static assets (images, fonts, icons)
├── components/        # Shared/reusable UI components (buttons, modals, inputs…)
├── hooks/             # Custom React hooks
├── pages/             # One file per route/page
├── services/          # API service functions (per resource)
├── utils/             # General utility/helper functions
├── App.tsx            # Route definitions
├── config.ts          # Environment config (BASE_URL, etc.)
├── index.css          # Global resets and Bootstrap overrides only
└── main.tsx           # App entry point
```

---

## Styling

This project uses **Bootstrap 5** for layout and UI components. The goal is to rely on Bootstrap utility classes as much as possible and keep custom CSS to a minimum.

- Use Bootstrap classes directly in JSX (`className="d-flex gap-3 mt-4"`)
- Reserve `index.css` for global resets or overrides that Bootstrap doesn't cover
- Avoid component-scoped CSS files unless strictly necessary

---

## Reusable components

The `src/components/` folder is for UI building blocks that are used in more than one place. If you find yourself writing the same button, modal, or input in multiple pages, it belongs here.

Good candidates for `components/`:

- `AppButton.tsx` - a wrapper around Bootstrap's button with consistent variant/size props
- `AppModal.tsx` - a controlled modal with a standard header/body/footer layout
- `AppInput.tsx` - a labeled input with built-in error message display
- `PropertyCard.tsx` - the card used to display a property in listings and search results

A simple example:

```tsx
// src/components/AppButton.tsx
interface Props {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const AppButton = ({ label, onClick, variant = 'primary', disabled = false }: Props) => (
  <button
    className={`btn btn-${variant}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);
```

```tsx
// Usage anywhere in the app
import { AppButton } from '@/components/AppButton';

<AppButton label="Book a visit" onClick={handleBook} />
```

> If a component is only ever used inside one specific page, keep it in the `pages/` folder alongside that page. Move it to `components/` only when a second page needs it.

---

## Adding a new page

1. Create the page component in `src/pages/`, e.g. `src/pages/Properties.tsx`
2. Register the route in `App.tsx`:

```tsx
<Route path="/properties" element={<Properties />} />
```

`App.tsx` is the single source of truth for all routes.

---

## Making API calls

All API calls go through the `apiClient` defined in `src/api/apiClient.ts`. Never call `fetch` directly in components or hooks.

### Option 1 - service (recommended for data fetching logic)

Create a file in `src/services/` for each resource:

```ts
// src/services/propertyService.ts
import { api } from '@/api/apiClient';

export interface Property {
    id: string;
    title: string;
    price: number;
    address: string;
}

export const propertyService = {
    getAll: () => api.get<Property[]>('/properties'),
    getById: (id: string) => api.get<Property>(`/properties/${id}`),
    create: (data: Omit<Property, 'id'>) => api.post<Property>('/properties', data),
};
```

### Option 2 - hook (recommended for use inside React components)

Create a file in `src/hooks/` that wraps the service with React Query:

Note: You can find more about react-query at:
1) Official docs: https://tanstack.com/query/latest/docs/framework/react/quick-start
2) Medium useful: https://medium.com/@emiklad/a-beginners-guide-to-react-query-tanstack-query-v5-181eb9c813de

```ts
// src/hooks/useProperties.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '@/services/propertyService';

const PROPERTIES_KEY = ['properties'];

export const useProperties = () =>
    useQuery({ queryKey: PROPERTIES_KEY, queryFn: propertyService.getAll });

export const useCreateProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: propertyService.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PROPERTIES_KEY }),
    });
};
```

### Usage in a component

```tsx
// src/pages/Properties.tsx
import { useProperties } from '@/hooks/useProperties';

export const Properties = () => {
    const { data: properties, isLoading, error } = useProperties();

    if (isLoading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-danger text-center mt-5">Something went wrong.</p>;

    return (
        <div className="container mt-4">
            <div className="row g-3">
                {properties?.map(property => (
                    <div className="col-md-4" key={property.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{property.title}</h5>
                                <p className="card-text text-muted">{property.address}</p>
                                <p className="card-text fw-bold">{property.price} €</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
```

> As a rule of thumb: put fetch logic in a **service**, put React state/lifecycle glue in a **hook**, and keep **components** focused on rendering.