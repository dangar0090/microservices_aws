FROM public.ecr.aws/docker/library/node:18-alpine


WORKDIR /doctorService


COPY package.json ./


RUN npm install


COPY . .


EXPOSE 3001


CMD ["node", "index.js"]