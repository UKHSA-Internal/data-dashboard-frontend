This is a [Next.js](https://nextjs.org/) project built using the [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/) following [GOV.UK Design system (GDS)](https://design-system.service.gov.uk/) principles. We use Tailwind for any additional styling.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

By default the front-end will run against mocked api endpoints. We run a NodeJs Express based mock server
alongside the NextJs development instance. The mock server is run on [http://localhost:3005](http://localhost:3005) and loads the mocks from inside the `/mock-server/handlers` directory.

## Run development against real APIs

Add a .env.local file with the following values filled in:

```
API_URL=<URL_HERE>
API_KEY=<API_KEY_HERE>
```
