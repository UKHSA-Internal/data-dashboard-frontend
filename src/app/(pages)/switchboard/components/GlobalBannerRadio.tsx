interface GlobalBannerRadioProps {
  globalBannerScenario: string
  radioOption: string
}

const GlobalBannerRadio = ({ globalBannerScenario, radioOption }: GlobalBannerRadioProps) => {
  return (
    <div className="govuk-radios__item">
      <input
        defaultChecked={globalBannerScenario === radioOption}
        className="govuk-radios__input"
        id={`global-banners.scenario.${radioOption}`}
        name="global-banners.scenario"
        type="radio"
        value={radioOption == 'Inactive' ? '' : radioOption}
      />
      <label className="govuk-label govuk-radios__label" htmlFor={`global-banners.scenario.${radioOption}`}>
        {radioOption}
      </label>
    </div>
  )
}

export default GlobalBannerRadio
