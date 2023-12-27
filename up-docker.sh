cd ./IATEC.Calendar.Service
dotnet build
docker build . -t backend

cd ..

cd ./IATEC.Calendar.WebApp
ng build
docker build . -t frontend

cd ..
docker-compose up
