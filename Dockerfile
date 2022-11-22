FROM node:14 as base
COPY . /package.json ./
RUN yarn
COPY ./lerna.json ./
EXPOSE 80
CMD ["yarn", "start"]
# Package chatbot-server
FROM node:10 as chatbot-server-0
WORKDIR /packages/server
COPY  . /packages/server/package.json ./
RUN yarn
# Package chatbot-server
FROM node:10 as chatbot-test-client-0
WORKDIR /packages/client
COPY  . /packages/client/package.json ./
RUN yarn
# final stage
FROM base
COPY --from=chatbot-server-0 /packages/server /packages/server
COPY --from=chatbot-test-client-0 /packages/client /packages/client