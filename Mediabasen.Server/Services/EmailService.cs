using MailKit.Net.Smtp;
using MailKit.Security;
using Mediabasen.Models.Order;
using Mediabasen.Models.Product;
using MimeKit;
using MimeKit.Text;

namespace Mediabasen.Server.Services
{
    public class EmailService
    {
        private readonly ProductService _productService;
        private readonly string _emailHost;
        private readonly int _port;
        private readonly string _mailUsername;
        private readonly string _mailAppPassword;
        private readonly string _baseUrl;

        public EmailService(ConfigurationManager configurationManager, ProductService productService)
        {
            _productService = productService;
            var settings = configurationManager.GetSection("EmailSettings");

            _emailHost = settings["MailHost"];
            _port = int.Parse(settings["MailPort"]);
            _mailUsername = settings["MailUsername"];
            _mailAppPassword = settings["MailAppPassword"];

            _baseUrl = configurationManager.GetSection("GeneralSettings")["BaseUrl"];
        }

        public async Task<bool> SendPaymentConfirmation(string to, Order order)
        {
            var emailBody = $"<h1>Tack för din betalning!</h1><p>Vi har nu mottagit betalning för order: {order.Id} och den håller just nu på att packas!</p>";

            string orderLink = GetOrderLink(order);

            emailBody += $"<p>Du kan följa din order på denna länk: <a href=\"{orderLink}\">{orderLink}</a></p>";

            return await SendEmail(to, "Betalningsbekräftelse", emailBody);
        }

        public async Task<bool> SendOrderConfirmation(string to, Order order, List<Product> products)
        {
            var emailBody = $"<h1>Tack för din beställning!</h1><p>Du har beställt följande:</p>";

            var orderList = $"<ul>";

            var itemsString = $"";

            foreach (var item in order.OrderItems)
            {
                var product = products.Find(u => u.Id == item.ProductId);
                itemsString += $"<li>x {item.Amount} - {product.Name} - {_productService.GetCalculatedDiscountedPrice(product)} kr</li>";
            }

            orderList += itemsString + $"</ul>";

            emailBody += orderList;

            emailBody += $"Belopp att betala: {order.TotalPrice} kr";

            string orderLink = GetOrderLink(order);

            emailBody += $"<br> Du kan följa din beställning samt betala på denna länk: <a href=\"{orderLink}\">{orderLink}</a>";

            return await SendEmail(to, "Orderbekräftelse", emailBody);
        }

        private string GetOrderLink(Order order)
        {
            return _baseUrl + $"/order?orderId={order.Id}";
        }

        public async Task<bool> SendEmail(string to, string subject, string body)
        {
            using var smtpClient = new SmtpClient();
            try
            {
                smtpClient.Connect(_emailHost, _port, SecureSocketOptions.StartTls);
                smtpClient.Authenticate(_mailUsername, _mailAppPassword);

                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_mailUsername));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = body };

                var test = await smtpClient.SendAsync(email);

                smtpClient.Disconnect(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                if (smtpClient.IsConnected)
                {
                    smtpClient.Disconnect(true);
                }
                return false;
            }

            return true;
        }
    }
}
