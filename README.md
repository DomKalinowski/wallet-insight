# WalletInsight — Bank Statement Analyser
<p align="center">
<img src="https://github.com/DomKalinowski/wallet-insight/assets/46345195/6ab2af4b-2e44-4770-a213-9cdc541ceca7" alt="WalletInsightMascot" height="250">
</p>
## Introduction
This CLI tool combines and analyses bank statements from multiple sources into a single, sortable table. Developed not to deal with MS Excel, it's a personal project aimed at understanding financial patterns over the past five years to aid in future budgeting and financial planning.

<img align="right" width="550" alt="image" src="https://github.com/DomKalinowski/wallet-insight/assets/46345195/2babfa2d-e494-4d95-a7e9-fe0bd3dab231">

## Features
- **Combine Multiple Statements:** Merge CSV files from various banks, each potentially having different column layouts.
- **Date Sorting:** Automatically sorts entries by date to streamline analysis.
- **Selective Analysis:** Option to select and analyze statements from a single source.
- **Commander.js Integration:** Utilizes Commander.js to provide a helpful and intuitive command-line interface.
- **Visual Distinctions:** Months are colour-coded for quick identification. Even and odd years are styled differently (odd years are underlined, bolded and italic), facilitating pattern recognition over multiple years.
- **Biome.js Formatting:** Uses biome.js for enhanced formatting and alignment within the CLI output.
- **Statement Identification:** The last column in the table displays the statement's name, typically the bank's name, to quickly identify the source of the data.

## Requirements
- Node.js
- Commander.js
- Biome.js
- @fast-csv/parse
- ansis
- console-table-printer

## Installation
Clone the repository and install the required Node.js packages:
```bash
git clone https://github.com/DomKalinowski/wallet-insight.git
cd wallet-insight
npm install
```

## Usage
To run the analyzer, navigate to the project directory and use:
```bash
node wicli --help
```
This will display all available commands and options. For specific functionalities, refer to the help documentation provided by the CLI.

## Configuration
Configure the tool via the `walletconfig.json` file located in your project directory. This file should specify the shared directory for statement files, the mapping of file names to their respective keys, and the column name mappings for unifying different statement formats.

Example `walletconfig.json`:
```json
{
    "dir": "/path/to/your/bank/statements/",
    "files": {
        "first-bank": "first-bank_account_statement_2000-01.12.2050.csv",
        "second-bank": "second-bank_account_statement_2000-01.12.2050.csv"
    },
    "columns": {
        "first-bank": {
            "ID": null,
            "Date": "date",
            "Account": null,
            "Amount": "amount",
            "Type": "type",
            "Reference": "reference",
            "_blank": null
        },
        "second-bank": {
            "Transaction ID": null,
            "Date": "date",
            "Time": null,
            "Type": "type",
            "Name": null,
            "Category": null,
            "Amount": "amount",
            "Currency": null,
            "Notes": null,
            "Address": null,
            "Receipt": null,
            "Description": "reference",
        }
    }
}
```

## Limitations
This project is tailored for personal use and not intended for extensive production deployment. It was created as a one-off tool to aid in personal financial analysis and is shared publicly for educational or developmental inspiration only.