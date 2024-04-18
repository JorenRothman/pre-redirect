# Redirect Container

## Build

```bash
docker build -t pre-redirect-server .
```

## Start

```bash
docker run -dit --name redirect-me-daddy -p 80:80 pre-redirect-server
```

## Destroy

```bash
docker stop redirect-me-daddy && docker rm redirect-me-daddy
```
