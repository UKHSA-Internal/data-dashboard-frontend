interface AboutProps {
  description: string
}

const About = ({ description }: AboutProps) => {
  return <p className="govuk-!-margin-bottom-2 pt-0">{description}</p>
}

export default About
