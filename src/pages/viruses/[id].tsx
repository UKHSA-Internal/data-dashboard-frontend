import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'
import { data as mockVirusesData, VirusesResponse } from '@/mocks/api/viruses'
import { H1, ListItem, Paragraph, UnorderedList } from 'govuk-react'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Virus() {
  return (
    <>
      <H1>Virus detail page (wip)</H1>
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Symptoms</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Paragraph>
              Flu symptoms come on very quickly and can include:
            </Paragraph>
            <UnorderedList>
              <ListItem>a sudden high temperature</ListItem>
              <ListItem>an aching body</ListItem>
              <ListItem>feeling tired or exhausted</ListItem>
              <ListItem>a dry cough</ListItem>
              <ListItem>a sore throat</ListItem>
              <ListItem>a headache</ListItem>
              <ListItem>difficulty sleeping</ListItem>
              <ListItem>loss of appetite</ListItem>
              <ListItem>diarrhoea or tummy pain</ListItem>
              <ListItem>feeling sick and being sick</ListItem>
            </UnorderedList>
            <Paragraph>
              The symptoms are similar for children, but they can also get pain
              in their ear and appear less active.
            </Paragraph>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Transmission</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <>
              <Paragraph>People with flu can spread it to others.</Paragraph>
              <Paragraph>
                Most experts think that flu viruses spread mainly by droplets
                made when people with flu cough, sneeze, or talk.
              </Paragraph>
              <Paragraph>
                These droplets can land in the mouths or noses of people who are
                nearby (usually within about 6 feet away) or possibly be inhaled
                into the lungs.
              </Paragraph>
              <Paragraph>
                Less often, a person might get flu by touching a surface or
                object that has flu virus on it and then touching their own
                mouth, nose, or possibly their eyes.
              </Paragraph>
            </>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Treatment</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Paragraph>
              If you have flu, there are some things you can do to help get
              better more quickly.
            </Paragraph>
            <UnorderedList>
              <ListItem>rest and sleep</ListItem>
              <ListItem>keep warm</ListItem>
              <ListItem>
                take paracetamol or ibuprofen to lower your temperature and
                treat aches and pains
              </ListItem>
              <ListItem>
                drink plenty of water to avoid dehydration (your urine should be
                light yellow or clear)
              </ListItem>
            </UnorderedList>
            <Paragraph>
              A pharmacist can give treatment advice and recommend flu remedies.
            </Paragraph>
            <Paragraph>
              Do not take paracetamol and flu remedies that contain paracetamol
              at the same time as it&apos;s easy to take more than the
              recommended dose.
            </Paragraph>
            <Paragraph>
              GPs do not recommend antibiotics for flu because they will not
              relieve your symptoms or speed up your recovery.
            </Paragraph>
            <strong>
              Ask for an urgent GP appointment or get help from NHS 111 if:
            </strong>
            <Paragraph>You or your child have symptoms of flu and:</Paragraph>
            <UnorderedList>
              <ListItem>
                you&apos;re worried about your baby&apos;s or child&apos;s
                symptoms
              </ListItem>
              <ListItem>you&apos;re 65 or over</ListItem>
              <ListItem>you&apos;re pregnant</ListItem>
              <ListItem>
                you have a long-term medical condition – for example, diabetes
                or a condition that affects your heart, lungs, kidneys, brain or
                nerves
              </ListItem>
              <ListItem>
                you have a weakened immune system – for example, because of
                chemotherapy or HIV
              </ListItem>
              <ListItem>your symptoms do not improve after 7 days</ListItem>
            </UnorderedList>
            <Paragraph>You can call 111 or get help from 111 online.</Paragraph>
            <br />
            <strong>Call 999 or go to A&amp;E if you:</strong>
            <UnorderedList>
              <ListItem>get sudden chest pain</ListItem>
              <ListItem>have difficulty breathing</ListItem>
              <ListItem>start coughing up a lot of blood</ListItem>
            </UnorderedList>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Prevention</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Paragraph>How to avoid spreading the flu:</Paragraph>
            <Paragraph>
              Flu is very infectious and easily spread to other people.
              You&apos;re more likely to give it to others in the first 5 days.
            </Paragraph>
            <Paragraph>
              Flu is spread by germs from coughs and sneezes, which can live on
              hands and surfaces for 24 hours.
            </Paragraph>
            <Paragraph>To reduce the risk of spreading flu:</Paragraph>
            <UnorderedList>
              <ListItem>
                wash your hands often with warm water and soap
              </ListItem>
              <ListItem>
                cover your mouth and nose with a tissue when you cough or sneeze
              </ListItem>
              <ListItem>bin used tissues as quickly as possible</ListItem>
            </UnorderedList>
            <Paragraph>
              Try to stay at home and avoid contact with other people if you
              have a high temperature or you do not feel well enough to do your
              normal activities.
            </Paragraph>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              Surveillance and reporting
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <Paragraph>
              This is the content for surveillance and reporting.
            </Paragraph>
            <UnorderedList>
              <ListItem>
                <a href="https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season">
                  National flu and COVID-19 surveillance reports: 2022 to 2023
                  season
                </a>
              </ListItem>
              <ListItem>
                <a href="https://www.who.int/initiatives/global-influenza-surveillance-and-response-system">
                  Global Influenza Surveillance and Response System (GISRS)
                </a>
              </ListItem>
            </UnorderedList>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  viruses: VirusesResponse
}> = async () => {
  // Here we will make an API request to retrieve a list of viruses to pre-generate the pages
  // For now, we can use mocked json data
  return {
    props: {
      viruses: mockVirusesData,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Here we will make an API request to retrieve a list of viruses to pre-generate the pages
  // For now, we can use mocked json data
  const { viruses } = mockVirusesData

  // Get the paths we want to pre-render based on viruses
  const paths = viruses.map(({ name }) => ({
    params: { id: name.toLowerCase() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
