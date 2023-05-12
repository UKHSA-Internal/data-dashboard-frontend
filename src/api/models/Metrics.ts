import { z } from 'zod'

/**
 * The metrics list is prone to change so we must accept any string as well as an enum of metrics.
 * As a result, we lose TypeScript autocomplete if consuming this const (i.e. in tests/fixtures)
 */
export const Metrics = z
  .string()
  .or(
    z.enum([
      'new_cases_daily',
      'new_cases_7day_avg',
      'new_cases_7days_change',
      'new_cases_7days_change_percentage',
      'new_cases_7days_sum',
      'new_cases_by_age',
      'new_cases_rolling_rate',
      'new_cases_rolling_rate_by_age',
      'cases_rate_age_sex',
      'cases_age_sex',
      'new_deaths_daily',
      'new_deaths_7day_avg',
      'new_deaths_7days_sum',
      'new_deaths_7days_change',
      'new_deaths_7days_change_percentage',
      'new_admissions_daily',
      'new_admissions_7day_avg',
      'new_admissions_7days_change',
      'new_admissions_7days_change_percentage',
      'new_admissions_7days',
      'admissions_rate_age',
      'admissions_age',
      'covid_occupied_MV_beds',
      'covid_occupied_beds',
      'covid_occupied_MV_beds_7day_avg',
      'covid_occupied_beds_7day_avg',
      'covid_occupied_MV_beds_latest',
      'covid_occupied_beds_latest',
      'positivity_PCR_rolling_sum',
      'unique_individuals_PCR_rolling_sum',
      'positivity_7days_latest',
      'positivity_7days_change',
      'positivity_7days_change_percentage',
      'new_tests_7days_change',
      'new_tests_7days_change_percentage',
      'new_tests_7days_sum',
      'new_vaccinations_autumn22',
      'total_vaccinations_autumn22',
      'vaccinations_percentage_uptake_autumn22',
      'new_vaccinations_spring22',
      'total_vaccinations_spring22',
      'vaccinations_percentage_uptake_spring22',
      'latest_total_vaccinations_autumn22',
      'latest_vaccinations_uptake_autumn22',
      'latest_total_vaccinations_spring22',
      'latest_vaccinations_uptake_spring22',
      'total_vaccinations_given',
      'weekly_hospital_admissions_rate',
      'weekly_hospital_admissions_rate_by_age',
      'weekly_icuhdu_admissions_rate',
      'weekly_icu_admissions_rate_by_age',
      'weekly_positivity',
      'weekly_positivity_by_age',
      'weekly_change_positivity',
      'weekly_percent_change_positivity',
      'weekly_positivity_latest',
      'weekly_hospital_admissions_rate_latest',
      'weekly_hospital_admissions_rate_change',
      'weekly_hospital_admissions_rate_change_percentage',
      'weekly_icu_admissions_rate_latest',
      'weekly_icu_admissions_rate_change',
      'weekly_icu_admissions_rate_change_percentage',
      'weekly_hospital_admissions_rate_by_geography',
      'weekly_icu_admissions_rate_by_region',
      'new_pcr_tests_daily',
    ])
  )

export type Metrics = z.infer<typeof Metrics>

export const PercentageMetrics = z
  .string()
  .or(
    z.enum([
      'new_cases_7days_change_percentage',
      'new_deaths_7days_change_percentage',
      'new_admissions_7days_change_percentage',
      'positivity_7days_change_percentage',
      'new_tests_7days_change_percentage',
      'vaccinations_percentage',
      'vaccinations_percentage',
      'weekly_hospital_admissions_rate_change_percentage',
      'weekly_icu_admissions_rate_change_percentage',
    ])
  )

export type PercentageMetrics = z.infer<typeof PercentageMetrics>
