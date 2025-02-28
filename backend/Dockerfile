# use node img
FROM node:18

# set up work dir
WORKDIR /usr/src/app

# copy package.json and add dependecies
COPY package*.json ./
RUN npm install

# copy all code
COPY . .

EXPOSE 8800

# 运行后端服务器
CMD ["node", "index.js"]
