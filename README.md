# INDONESIA ON CHAIN
    Decentralized E-Learning Platform, providing blockchain learning.


## Technologies Used

- JavaScript
- Motoko
- React
- Tailwind CSS
- Redux-Toolkit
- Redux-Saga
- DFINITY (DFX) environment

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repoUrl>
    cd <repoName>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. For local development:

    - Start the DFINITY environment:

        ```bash
        dfx start --clean
        ```

    - Pull dependencies:

        ```bash
        dfx deps pull
        dfx deps init internet_identity --argument '(null)'
        dfx deps deploy
        ```

    - Deploy the application:

        ```bash
        dfx deploy
        ```

4. For deploying on the IC network:

    ```bash
    dfx deploy --network ic
    ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
