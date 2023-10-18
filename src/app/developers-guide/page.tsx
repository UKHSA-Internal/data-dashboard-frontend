import { Tabs, TabsContent, TabsList, TabsTrigger, View } from '@/app/components/ui/ukhsa'

import CodeBlock from '../components/ui/ukhsa/CodeBlock/CodeBlock'
import SwaggerDocs from '../components/ui/ukhsa/SwaggerDocs/SwaggerDocs'

export default function DevelopersGuide() {
  const setupBlock = `
  const endpoint = (
      'https://api.coronavirus.data.gov.uk/v1/data?' +
      'filters=areaType=nation;areaName=england&' +
      'structure={"date":"date","newCases":"newCasesByPublishDate"}'
  );
          
  const getData = async ( url ) => {
  
      const { data, status, statusText } = await get(url, { timeout: 10000 });
  
      if ( status >= 400 )
          throw new Error(statusText);
  
      return data
  
  };  // getData
  
  
  const main = async () => {
      const result = await getData(endpoint);
      console.log(result);
  };  // main
  
  
  main().catch(err => {
      console.error(err);
      process.exitCode = 1;
  });
          `

  const UrlBlock = `'https://api.dev.ukhsa-dashboard.data.gov.uk/'`

  return (
    <View heading="Developers Guide" lastUpdated="12 may 2023, 2:40">
      <p className="govuk-body">Welcome to the Developers Guide for the UKHSA data dashboard API.</p>
      <p className="govuk-body">
        Please see below for instructions initially on how to interact and use our API, as well as swagger API
        documentation detailing information about each endpoint including parameters and example responses
      </p>
      <Tabs defaultValue="developer-guide">
        <TabsList>
          <TabsTrigger value="developer-guide">Using the API</TabsTrigger>
          <TabsTrigger value="api">Swagger</TabsTrigger>
          <TabsTrigger value="contribute">Contribute</TabsTrigger>
        </TabsList>
        <TabsContent value="developer-guide">
          <h2 className="govuk-heading-m">Who is this API for?</h2>
          <p className="govuk-body">
            APIs are used for all kinds of projects, if you consectetur adipiscing elit. Integer a efficitur lectus, non
            faucibus urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            <br />
            <br />
            Morbi et aliquet orci, non convallis nisl. Mauris commodo tincidunt nisi, eu ultricies sapien maximus eget.
            Sed non sodales enim. Phasellus nec facilisis tortor, eu eleifend ex.
          </p>

          <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
          <h2 className="govuk-heading-m">Initial setup</h2>
          <p className="govuk-body">
            When looking to set up this project lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            efficitur lectus, non faucibus urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <CodeBlock code={UrlBlock} />
          <p className="govuk-body govuk-!-margin-top-4">
            Vestibulum at ligula mi. Morbi nunc nisl, dapibus ultricies orci ut, consequat lacinia arcu. Integer tempor
            dui vel metus imperdiet auctor. Pellentesque at tristique est. Phasellus congue, turpis quis dictum commodo,
            lorem turpis pulvinar ex, id convallis odio sem sit amet mi. Praesent faucibus ante id maximus pellentesque.
            Donec ante ipsum, auctor eu tellus et, finibus iaculis nisl. Nullam non mauris mauris. Curabitur ligula
            nibh, mattis ac convallis id, iaculis in lorem.
          </p>

          <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
          <h2 className="govuk-heading-m">Data structure</h2>
          <p className="govuk-body">
            This is how the data is structured lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            efficitur lectus, non faucibus urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>Theme – the overall subgroup of the data. For example, infectious_disease</li>
            <li>Sub_theme – id convallis odio sem sit amet mi Phasellus congue, turpis quis dictum commodo</li>
            <li>Vestibulum – convallis sem sit amet mi Phasellus congue, turpis quis dictum commodo</li>
            <li>Pulvinar – Integer tempor dui vel metus imperdiet auctor</li>
            <li>Timeseries – further filtering of the data within a timeframe</li>
          </ul>

          <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
          <h2 className="govuk-heading-m">Setup your first UKHSA data dashboard API call</h2>
          <p className="govuk-body">
            See the below as an example of how to set up dolor sit amet, consectetur adipiscing elit. Integer a
            efficitur lectus, non faucibus urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <CodeBlock code={setupBlock} />
        </TabsContent>
        <TabsContent value="api">
          <SwaggerDocs />
        </TabsContent>
        <TabsContent value="contribute">
          <h2 className="govuk-heading-m">GitHub Project</h2>
          <p className="govuk-body">
            The UKHSA data dashboard API is fully open source. Below is a link to our github project; where you can
            view, clone and contribute to our project.
          </p>
          <button className="govuk-button">Go to project</button>

          <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
          <h2 className="govuk-heading-m">Report an issue</h2>
          <p className="govuk-body">Alternatively you can provide us some feedback on a potential issue below</p>
          <textarea className="govuk-textarea" rows={5} />
          <button className="govuk-button">Submit</button>
        </TabsContent>
      </Tabs>
    </View>
  )
}
