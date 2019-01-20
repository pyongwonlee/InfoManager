using InfoManager.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace InfoManager.Web.Helpers
{
    public class ValidationHandleAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            // if model state is wrong, returns the custom errors
            if (!context.ModelState.IsValid)
            {
                var errorData = ResultBase.ErrorResult(context.ModelState);
                context.Result = new BadRequestObjectResult(errorData);
            }
            base.OnActionExecuting(context);
        }
    }
}
