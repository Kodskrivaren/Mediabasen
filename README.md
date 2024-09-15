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
  },
  "StripeSettings": {
    "StripeSecret": "{STRIPE_SECRET_KEY}"
  },
  "GeneralSettings": {
    "BaseUrl": "{BASE_URL_FOR_WEBSITE}"
  },
  "EmailSettings": {
    "MailHost": "{MAIL_HOST}",
    "MailPort": "{MAIL_PORT}",
    "MailUsername": "{MAIL_USERNAME}",
    "MailAppPassword": "{MAIL_PASSWORD}"
  }
}
```

## wwwRoot

You also need to create the static folder wwwRoot in Mediabasen.Server/
It needs to have a set of subfolders as well.

wwwRoot/images/movie/
