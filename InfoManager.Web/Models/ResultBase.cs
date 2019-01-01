using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace InfoManager.Web.Models
{
    public class ResultBase
    {
        public bool Success { get; set; }

        public string[] Errors { get; set; }

        public static ResultBase ErrorResult(string message)
        {
            return new ResultBase
            {
                Success = false,
                Errors = new string[] { message }
            };
        }

        public static ResultBase ErrorResult(ModelStateDictionary modelState)
        {
            return new ResultBase
            {
                Success = false,
                Errors = modelState.Values
                        .SelectMany(x => x.Errors)
                        .Select(x => x.ErrorMessage)
                        .ToArray()
            };
        }
    }
}
