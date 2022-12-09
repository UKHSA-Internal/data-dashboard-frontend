import React from "react";
import { Simulate } from "react-dom/test-utils";
import MiniCard from "./MiniCard";

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      dataLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://wp-lb-api-1448457284.eu-west-2.elb.amazonaws.com/testdata/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result,
            dataLoaded: true
          })
        },
        (error) => {
          //TODO: handle ajax error gracefully
          console.log(error.toString());
        }
      );
  }


  render() {

    if (!this.state.dataLoaded) {
      return null;
    }
    const { items } = this.state;
    items.forEach((element) => {
      element.mode = "lines";
      element.type = "scatter";
    });

    const a = items[0];
    const b = items[1];
    const c = items[2];
    const d = items[1];

    return (
      <>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1
              className="govuk-heading-l govuk-!-margin-bottom-2 govuk-!-margin-top-2"
              data-nosnippet="true"
            >
              England Summary
            </h1>
            <p className="govuk-body-m govuk-!-margin-bottom-1 govuk-!-margin-top-3">
              The official UK government website for data and insights on winter
              illnesses.
            </p>
          </div>
        </div>
        <div>
          <p className="govuk-body-m govuk-!-margin-bottom-3 govuk-!-margin-top-2">
            See the{" "}
            <a
              className="govuk-link govuk-link--no-visited-state"
              href="/easy_read"
            >
              simple summary
            </a>{" "}
            for England.
          </p>
        </div>

        <article>
          <ul className="govuk-list card-container">
            <MiniCard title="Influenza A in England" data-source="influenza_a" data={[a]} />
            <MiniCard title="Adenovirus in England" data-source="adenovirus" data={[b]} />
            <MiniCard
              title="Parainfluenza in England"
              data-source="parainfluenza"
              data={[c]}
            />
            <MiniCard title="Streptococcus A in England" data-source="strep_a" data={[d]} />
          </ul>
        </article>
      </>
    );
  };
}
export default HomePage;
