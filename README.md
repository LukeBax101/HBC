# HBC


Docker commands:

 - To start postgres database container:

```
./startdb.sh
```

 - To manage from inside container:

```
docker exec -it hbc-postgres bash
psql -U postgres
```

 - To manage from host machine:

```
psql -h localhost -p 5432 -U postgres -W
```

- To shutdown database container

```
docker stop hbc-postgres
docker rm hbc-postgres
```
