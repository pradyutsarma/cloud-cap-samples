FROM pradyutsarma/cap-base:0.0.1
WORKDIR packages
COPY . .
RUN [ "npm", "install" ]
RUN [ "npm", "install", "sqlite3" ]
COPY . .
CMD [ "cds", "run", "--in-memory", "./packages/bookshop" ]

