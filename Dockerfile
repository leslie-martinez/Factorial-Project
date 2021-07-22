# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG VARIANT=12
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

# psql
RUN apt-get update && apt-get install -y postgresql-client

# Define the application's working directory.
WORKDIR /usr/src/app

# Install dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

# Build the app
COPY . .
RUN npm run build

# Start the app
ENTRYPOINT ["npm", "start"]
