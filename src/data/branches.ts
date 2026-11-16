export type BranchContact = {
  name: string;
  address: string;
  addressMultiline: string;
  tel: string;
  telHref: string;
  whatsappHref: string;
  mapUrl: string;
  embedUrl: string;
};

export const branches: BranchContact[] = [
  {
    name: "Chinhoyi Branch",
    address: "Shops 17 & 18, Corner Chinhoyi Street & Kwame Nkrumah, Harare, Zimbabwe",
    addressMultiline: "Shops 17 & 18\nCorner Chinhoyi Street & Kwame Nkrumah\nHarare, Zimbabwe",
    tel: "+263 77 947 3630",
    telHref: "tel:+263779473630",
    whatsappHref: "https://wa.me/263779473630",
    mapUrl: "https://maps.app.goo.gl/phX8agCFv6CMPaa5A",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.4!2d31.0467!3d-17.8297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4f00169a5b7%3A0x6e56e0fe7c998793!2sChinhoyi+St+%26+Kwame+Nkrumah+Ave%2C+Harare!5e0!3m2!1sen!2szw!4v1700000000000",
  },
  {
    name: "4th Street Branch",
    address: "Shop No.7, Afgate House, 49 George Silundika Avenue, Cnr 4th Street, Harare, Zimbabwe",
    addressMultiline: "Shop No.7, Afgate House\n49 George Silundika Avenue\nCorner 4th Street, Harare, Zimbabwe",
    tel: "+263 77 966 3642",
    telHref: "tel:+263779663642",
    whatsappHref: "https://wa.me/263779663642",
    mapUrl: "https://maps.app.goo.gl/hdWbG4hUNdaErJGh8",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.5!2d31.0505!3d-17.8310!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4e8b0c7e5a1%3A0x2f3a4b5c6d7e8f90!2sGeorge+Silundika+Ave+%26+4th+St%2C+Harare!5e0!3m2!1sen!2szw!4v1700000000001",
  },
  {
    name: "2nd Street Branch",
    address: "No.2 ICL Building, Sam Nujoma Street and Samora Machel Avenue, Harare, Zimbabwe",
    addressMultiline: "No.2 ICL Building\nSam Nujoma Street & Samora Machel Avenue\nHarare, Zimbabwe",
    tel: "+263 79 053 8771",
    telHref: "tel:+263790538771",
    whatsappHref: "https://wa.me/263790538771",
    mapUrl: "https://www.google.com/maps?q=-17.826633570115654,31.05037728747765",
    embedUrl:
      "https://maps.google.com/maps?q=-17.826633570115654,31.05037728747765&z=17&output=embed",
  },
];

