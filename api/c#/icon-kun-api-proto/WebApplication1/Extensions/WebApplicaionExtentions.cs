public static class WebApplicaionExtentions
{
    public static void SetMap(this WebApplication app)
    {
        // GET
        app.MapGet("/get", async context =>
        {
            //string param = (string)context.GetRouteValue()
            var response = new ResponseModel();
            response.value = "test";
            await context.Response.WriteAsJsonAsync(response);
        });

    }

}