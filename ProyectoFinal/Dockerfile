FROM node:18-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto 3000
EXPOSE 3000

# Ejecutar la app
CMD ["node", "src/app.js"]
