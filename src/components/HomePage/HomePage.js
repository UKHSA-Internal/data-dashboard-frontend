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
    // fetch("http://wp-lb-api-1448457284.eu-west-2.elb.amazonaws.com/testdata/")
    fetch("http://localhost:5100/items/")
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
            <MiniCard data={this.getData("Influenza")} />
            <MiniCard data={this.getData("RSV")} />
            <MiniCard data={this.getData("SARS-CoV-2")} />
            <MiniCard data={this.getData("Adenovirus")} />
            <MiniCard data={this.getData("Parainfluenza")} />
            <MiniCard data={this.getData("Rhinovirus")} />
            <MiniCard data={this.getData("hMPV")} />
          </ul>
        </article>
      </>
    );
  }


  getData(virusName) {
    const { items } = this.state;
    return {
      x: items["dates"],
      y: items[virusName],
      mode: "lines",
      type: "scatter",
      line: { color: "rgb(0, 0, 0)", width: 2 },
      name: virusName
    };
  }
}
export default HomePage;
