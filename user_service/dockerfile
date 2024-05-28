FROM public.ecr.aws/docker/library/node:18-alpine

WORKDIR /userService


COPY package.json .


RUN npm install


COPY . .


EXPOSE 3002


CMD ["node", "index.js"]