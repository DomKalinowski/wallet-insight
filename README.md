# WalletInsight — Bank Statement Analyser

<p align="center">
<img src="https://github.com/DomKalinowski/wallet-insight/assets/46345195/6ab2af4b-2e44-4770-a213-9cdc541ceca7" alt="WalletInsightMascot" height="250">
</p>

## Introduction
This CLI tool is designed to combine and analyse bank statements from multiple sources into a single, sortable table. Initially developed as a one-night project, it has become my day-to-day tool for analysing my finances, helping to understand financial patterns over the past five years and aid in future budgeting and financial planning.

<img align="right" width="550" alt="image" src="https://github.com/DomKalinowski/wallet-insight/assets/46345195/2babfa2d-e494-4d95-a7e9-fe0bd3dab231">

## Features
- **Combine Multiple Statements:** Merge CSV files from various banks, each potentially having different column layouts.
- **Date Sorting:** Automatically sorts entries by date to streamline analysis.
- **Selective Analysis:** Option to select and analyse statements from a single source.
- **Commander.js Integration:** Utilises Commander.js to provide a helpful and intuitive command-line interface.
- **Visual Distinctions:** Months are colour-coded for quick identification. Even and odd years are styled differently, facilitating pattern recognition over multiple years.
- **Biome.js Formatting:** Uses biome.js for enhanced formatting and alignment within the CLI output.
- **Statement Identification:** The last column in the table displays the name of the statement, typically the name of the bank, to easily identify the source of the data.
- **Transaction Filtering:** Use MIN and MAX options to filter transactions by amount, facilitating analysis of significant spendings or earnings. ABS MIN/MAX allows for threshold-based filtering regardless of transaction direction.

## Minimal Boilerplate & Developer Experience
This project also explores the use of minimal boilerplate while preserving an optimal developer experience:
- **Native Node Modules for Testing:** Uses `node:test` and `node:assert` for writing unit tests, offering a lightweight alternative to Jest.
- **Type Safety with JSDoc:** Implements TypeScript-like type safety via JSDoc annotations, reducing the need for full TypeScript integration.
- **Automation with ChatGPT:** Leverages ChatGPT to generate repetitive JSDocs and unit tests. Note: Since "ChatGPT can make mistakes," all generated content is manually reviewed to ensure accuracy and relevance.

## Requirements
- Node.js
- Commander.js
- Biome.js

## Installation
Clone the repository and install the required Node.js packages:
```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Usage
To run the analyser, navigate to the project directory and use:
```bash
node app.js --help
```
This will display all available commands and options. For specific functionalities, refer to the help documentation provided by the CLI.

**Filtering Options:**
- `--MIN <amount>`: Displays transactions exceeding the specified minimum amount (positive for income, negative for expenses).
- `--MAX <amount>`: Displays transactions not exceeding the specified maximum amount (positive for income, negative for expenses).
- `--ABS MIN <amount>`: Displays all transactions, whether income or expenses, that are above the specified absolute minimum amount.
- `--ABS MAX <amount>`: Displays all transactions, whether income or expenses, that are below the specified absolute maximum amount.

## Configuration
The `walletconfig.json` file for the Bank Statement Analyzer tool is structured to manage the processing and analysis of bank statements from various sources, each possibly having different formats. 

Before starting, it is recommended to configure the tool using the provided `walletconfig.example.json` file. This example file contains a template of the configuration structure explained below, which you can use as a starting point to bootstrap your own configuration for the analyser.

```json
{
    "dir": "/path/to/your/bank/statements/",
    "statements": {
        "bank-identifier": {
            "file": "filename.csv",
            "columns": {
                "Original Column Name": "mapped_name_or_null"
            }
        }
    },
    "output": {
        "tables": {
            "category_name": [
                {
                    "reference": "specific_value",
                    "absMax": "maximum_value",
                    "absMin": "minimum_value"
                }
            ]
        }
    }
}
```

### Configuration Details

- **dir**: Specifies the directory path where the bank statement CSV files are located. This path should be absolute or relative to the location of the application's execution context.

- **statements**: A collection of entries where each key represents a unique identifier for a bank or source of statements. Each bank's configuration includes:
  - **file**: The filename of the bank's CSV statement file located in the directory specified by `dir`.
  - **columns**: Maps the original column names from the bank's CSV file to the standardised column names used by the application. If a column should be ignored, it is mapped to `null`.

### Statements Example
In this section, you define how the application should interpret each CSV file's columns:
```json
"columns": {
    "ID": null,
    "Date": "date",
    "Account": null,
    "Amount": "amount",
    "Type": "type",
    "Reference": "reference",
    "_blank": null
}
```
- **ID**, **Account**, and **_blank** are examples of columns that are not required for analysis and are thus mapped to `null`.
- **Date**, **Amount**, **Type**, and **Reference** are essential for the application and are mapped to corresponding fields.

### Output
- **tables**: Organises the output data into specified categories, each represented by a key (e.g., "💪🔏 gym-memberships"). Within each category, you can filter the transactions based on certain criteria:
  - **reference**: Specifies a string to match in the reference field of transactions.
  - **absMax** and **absMin**: Define absolute maximum and minimum transaction amounts to include. These are optional and can be set for each reference to narrow down the analysis.

### Output Tables Example
This section allows you to specify different analysis tables, which help segregate transactions according to specified criteria:
```json
"tables": {
    "💪🔏 gym-memberships": [
        {
            "reference": "David Lloyd",
            "absMax": 300,
            "absMin": 100
        },
        {
            "reference": "The Gym"
        }
    ]
}
```
In the example above, the "gym-memberships" category filters transactions related to gym memberships, specifying different transaction size filters for entries like "David Lloyd".

## Limitations
This project is tailored for personal use and not intended for extensive production deployment. It was created as a one-off tool to aid in personal financial analysis and is shared publicly for educational or developmental inspiration only.