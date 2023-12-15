![Token Price Oracle - SC - banner](./assets/banner-ts.jpeg)

# Token Price Oracle - Orchestrator 🎶
Token Price Oracle is simple oracle for tracking token prices on-chain.
In this repo is located the Typescript Client orchestrator used for
tracking, management and orchestration of the data.

## Running the project 🚀
### Requirements ✅
- On your computer
  * If setting up using Docker
    * Installed [Docker](https://www.docker.com/)
    * Installed docker-compose (Bundled with the official Docker setup)
  * If setting up locally
    * Installed [Node.js 18](https://nodejs.org/en/)
    * Installed [yarn](https://yarnpkg.com/) package manager
    
### Installation ⚙️
#### Git
1. Clone the repo: ```git clone https://github.com/pajicf/token-price-oracle-orchestrator.git```
2. Navigate to the folder: ```cd token-price-oracle-orchestrator```

#### Setting up the environment
3. Run ```cp .env.example .env``` and fill the values`
> [!IMPORTANT]  
> Ensure that you've filled all the needed values in the .env

---
After you complete the previous steps, the following instruction will vary based on that
if you're trying to run the project using docker or your local setup
---

#### Docker setup
4. Run `docker-compose up`
5. That's it!
> [!NOTE]
> If you've pulled new code files you'll have to rebuild the Docker image using `docker-compose build --no-cache node_backend`

#### Running locally
4. Run ```yarn``` to install the dependencies
5. Building the project: ```yarn build```
6. Starting the project: ```yarn start```

### Commands 🧑‍💻
| Name             | Command          | Description                                      |
|------------------|------------------|--------------------------------------------------|
| Dev Environment  | ```yarn dev```   | Starts the development environment               |
| Build            | ```yarn build``` | Compiles the project and builds production files |
| Start            | ```yarn start``` | Starts the project from the production build     |
| Contract Typings | ```yarn lint```  | Lints the project using `eslint`                 |