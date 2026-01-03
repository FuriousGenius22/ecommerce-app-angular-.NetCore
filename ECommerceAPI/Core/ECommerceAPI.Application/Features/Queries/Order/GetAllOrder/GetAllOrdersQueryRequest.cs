using ECommerceAPI.Application.Features.Queries.Order;
using MediatR;

namespace ECommerceAPI.Application.Features.Queries.Order
{
    public class GetAllOrdersQueryRequest : IRequest<GetAllOrdersQueryResponse>
    {
        public int Page { get; set; } = 0;
        public int Size { get; set; } = 5;
    }
}