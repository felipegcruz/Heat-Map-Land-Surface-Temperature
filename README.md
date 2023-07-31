# Heat Map - Monthly Global Land-Surface Temperature

This project is a heat map that visualizes the monthly global land-surface temperatures. The data used for this heatmap is sourced from the freeCodeCamp dataset repository.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Data Source](#data-source)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

The heat map represents the monthly global land-surface temperatures over the years. The x-axis represents the years, and the y-axis represents the months. Each cell in the heat map is colored based on the land-surface temperature for that month and year.

## Features

- Interactive Heat Map: Hover over any cell in the heat map to view detailed information about the temperature for that specific month and year.
- Legend: A color legend is provided to interpret the temperature scale.

## Data Source

The dataset used for this heat map is available in JSON format and is sourced from the following URL:

[https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json)

The dataset contains information about the base temperature and monthly variance.

## Installation

To run the project locally, follow these steps:

1. Clone the repository or download the project files.

```
git clone https://github.com/felipegcruz/Heat-Map-Land-Surface-Temperature.git
```

2. Navigate to the project directory.

```
cd your_repository
```

3. Open the `index.html` file in your preferred web browser.

## Usage

Once you have the heat map displayed in your browser, you can interact with it in the following ways:

- Hover over any cell to see a tooltip with detailed information about the land-surface temperature for that month and year.
- Use the x-axis to explore the data across different years.
- Use the y-axis to compare the temperatures between different months.

## Dependencies

The project relies on the following libraries:

- [D3.js](https://d3js.org/): A JavaScript library for creating interactive data visualizations in web browsers.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore and analyze the data presented in the heat map! If you encounter any issues or have suggestions for improvements, please don't hesitate to open an issue or submit a pull request. Happy visualizing!