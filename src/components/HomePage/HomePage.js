import React from "react";
import MiniCard from "./MiniCard";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://wp-lb-api-1448457284.eu-west-2.elb.amazonaws.com/testdata/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            items: result,
            dataLoaded: true,
          });
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
      element.line = { color: "rgb(0, 0, 0)", width: 2 };
    });

    const influenza = items[0];
    const rsv = items[1];
    const rhinovirus = items[2];
    const parainfluenza = items[3];
    const hMPV = items[4];
    const adenovirus = items[5];
    const sarsCov2 = items[6];

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
              Weekly surveillance of Influenza, COVID-19 and other respiratory
              viruses in England.
            </p>
          </div>
        </div>
        <article>
          <ul className="govuk-list card-container">
            <MiniCard data={influenza} />
            <MiniCard data={rsv} />
            <MiniCard data={sarsCov2} />
            <MiniCard data={adenovirus} />
            <MiniCard data={parainfluenza} />
            <MiniCard data={rhinovirus} />
            <MiniCard data={hMPV} />
          </ul>
        </article>
      </>
    );
  }
}
export default HomePage;
