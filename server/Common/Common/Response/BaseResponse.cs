using System.Net;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace Common.Response;

public class BaseResponse<T>
{
    [System.Text.Json.Serialization.JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonProperty(Order = 5)]
    public Paging? Paging { get; set; }
    [JsonProperty(Order = 1)]
    public HttpStatusCode? Code { get; set; }
    [JsonProperty(Order = 2)]
    public string? Message { get; set; }
    [JsonProperty(Order = 3)]
    public bool? Error { get; set; }

    [System.Text.Json.Serialization.JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonProperty(Order = 4)]
    public T? Data { get; set; }
}