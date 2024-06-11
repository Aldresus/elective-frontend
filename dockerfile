# Utilisez une image Node pour construire l'application
FROM node:22 as builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Construisez l'application pour la production
RUN npm run build

# Utilisez une image Apache pour servir l'application
FROM httpd:2.4

# Copiez les fichiers de build de l'application dans le répertoire de distribution d'Apache
COPY --from=builder /app/dist /usr/local/apache2/htdocs/

# Exposez le port 80 pour accéder à l'application
EXPOSE 80

# Lancez Apache en mode premier plan
CMD ["httpd-foreground"]
