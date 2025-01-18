import nodemailer from "nodemailer";
import { EMAIL_CONFIG, EMAIL_RECIPIENTS } from "./constants.js";
import getGoldApplePrice from "./getGoldApplePrice.js";
import getWbPrice from "./getWbPrice.js";

export default async function notify() {
  const goldApplePrice = await getGoldApplePrice();
  const wbPrice = await getWbPrice();

  const transporter = nodemailer.createTransport(EMAIL_CONFIG);

  await transporter.sendMail({
    from: `"Price-checker" ${EMAIL_CONFIG.auth.user}`,
    to: EMAIL_RECIPIENTS,
    subject: "Проверка цен",
    html: `<div>
      <div>Золотое яблоко: ${goldApplePrice}₽</div>
      <div>Wildberries: ${wbPrice}₽</div>
    </div>`,
  });

  console.log("Уведомление отправлено");
}
