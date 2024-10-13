docker build -f Dockerfile.backend -t iatec-calendar-backend .
docker build -f Dockerfile.frontend -t iatec-calendar-frontend .
docker-compose up
