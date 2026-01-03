using ECommerceAPI.Application.ViewModels.Products;
using FluentValidation;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator() 
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lütfen Ürün Adını Boş Geçmeyiniz")
                .MinimumLength(2)
                .MaximumLength(50)
                    .WithMessage("Lütfen Ürün Adını 2 ile 50 karakter arasında giriniz");
            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lütfen Stok Bilgisini Boş Geçmeyiniz")
                .Must(s => s >= 0)
                    .WithMessage("Stok Bilgisi Negatig Olamaz");
            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lütfen Fiyat Bilgisini Boş Geçmeyiniz")
                .Must(s => s >= 0)
                    .WithMessage("Fiyat Bilgisi Negatif Olamaz");
        }
    }
}
