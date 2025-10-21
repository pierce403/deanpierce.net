---
description: remote password extraction from password managers
---

# Platypus

Delivered at BSides Las Vegas Underground track the same morning as Silk Road got taken down. (2013)

The silk road thing was actually super relevant because I had an awesome demo where I could extract the silk road passwords of everyone on the local network (so long as they had their password saved in their password manager and were using the same browser that they use for day to day stuff).

My tool would basically look for an unecrypted HTTP request, intercetpt it, and then deliver the stage 1 payload which would inject a hidden iframe into the target page.

The hidden iframe would then make several more hidden iframes&#x20;

This was very effective for Facebook, Amazon, eBay, Slashdot, Reddit, mail.ru, and basically every onion site. As long as the browser had ever seen the login form delivered over a non-HTTPS page, even if it was disabled years ago (like the case of Facebook) the passwords would then get autofilled into the hidden iframe, scraped out with javascript, and delivered to my password collector.

code: [https://github.com/pierce403/platypus](https://github.com/pierce403/platypus)
