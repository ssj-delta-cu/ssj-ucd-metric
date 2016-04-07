# ssj-ucd-metric
UCD Metric ET calculations.

Lead: UCDavis, Josué Medellín-Azuara

Estimates ET based on energy balance and the partition of sensible and
latent heat flux using mostly Landsat satellite data; with the
internal calibration of the sensible heat computation using the
ground-based reference ET.

## [Results](./results)

This method will provide estimates of ET, G, and H based on Landsat
data, at approximately 28 day increments.  Monthly results will be
created byapplying ETo data for the interperiods.


Data | Date | Daily | Monthly
---  | --- | --- | ---
ET   | [l] | [d] | [m]
H    | [l] | [d] | [m]
G    | [l] | [d] | [m]
Ts   | [l] | [d] | [m]

The following table describes some of the required data from the other sources.

Data | Date | Daily | Monthly
--------- | --- | --- | ---
ETo       | [W] | [W] | [W]
Z         | [O] | [O] | [O]
LandCover | [N] | [N] | [N]



[O]: https://github.com/ssj-delta-cu/ssj-overview
[W]: https://github.com/ssj-delta-cu/ssj-weather/cimis
[N]: https://github.com/ssj-delta-cu/ssj-nasa-landcover
[l]: ./results/dates
[d]: ./results/daily
[m]: ./results/monthly