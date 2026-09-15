# 1. Define a imagem de origem base
FROM node:24-alpine

# Configura o diretório global do pnpm
ENV PNPM_HOM="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 2. Define o diretório de trabalho interno do continer 
WORKDIR /app

# 3. Instalar o pnpm globalmente para gerenciar as dependências 
RUN npm install -g pnpm

# 4. Desativa a restrição do pnpm 11
RUN pnpm config set strict-dep-builds false

# 4. Copia apenas o manifesto de dependências
COPY package.json ./

# 5. Instalar as dependências de projeto
RUN pnpm install

# 6. Copia todo os restando do código
COPY . .

# 7. Expoe a porta padrão LDW
EXPOSE 3000

# 8. Comando para inicializar a aplicação
CMD ["pnpm", "dev"]

