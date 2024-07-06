### Webshop

Webshop built with a backend in ASP .NET Core and a frontend with React.

## Appsettings.json

Appsettings need to be created in Mediabasen.Server/

Appsettings structure:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server={HOST};Database={DBNAME};port={PORTNUMBER};user={USER};password={PASSWORD}"
  }
}
```

## wwwRoot

You also need to create the static folder wwwRoot in Mediabasen.Server/
It needs to have a set of subfolders as well.

wwwRoot/images/movie/
