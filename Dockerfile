FROM node:13.4.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY src/ /app
COPY conf/.env /app/.env
RUN npm install


# start app
CMD ["npm", "start"]
EXPOSE 3000