# FAQ

Our `dev` script in package.json uses `NODE_OPTIONS='--no-experimental-fetch'` flag to workaround an issue we're having with msw & NextJS where initial renders show but subsequent page refreshes 404. Debugging suggests that the msw handlers are only being registered on initial fetch calls.
