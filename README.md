# HBC


Docker commands:

 - To start postgres database container:

```
docker run -p 5432:5432 --name hbc-postgres -v /home/web/HBC/database/volume:/var/lib/postgresql/data -v /home/web/HBC/secrets:/run/secrets -e POSTGRES_PASSWORD_FILE=/run/secrets/postgres-passwd -d postgres
```

 - To manage inside container:

``` 
docker exec -it hbc-postgres bash
psql -U postgres
```

 - To exit container 

```
exit
exit
```

- To shutdown database container

```
docker stop
docker rm hbc-postgres
```
