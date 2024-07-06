using Microsoft.AspNetCore.Builder;

namespace Mediabasen.DataAccess.DbInitializer
{
    public interface IDbInitializer
    {
        void Initialize(WebApplicationBuilder builder);
    }
}
