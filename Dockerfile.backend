FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build

WORKDIR /app

EXPOSE 80
EXPOSE 443


COPY . .
RUN dotnet publish ./IATec.Calendar.Service/iatec.calendar.csproj -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build /app .

ENTRYPOINT ["dotnet", "iatec.calendar.dll"]
