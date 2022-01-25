module.exports = (template, product) => {
  let output = template.replace(/{%image%}/g, product.image);
  output = output.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%price%}/g, product.price);
  if (product.discount) {
    output = output.replace(/{%no_discount%}/g, "");
    output = output.replace(/{%offer%}/g, product.offer);
  } else {
    output = output.replace(/{%no_discount%}/g, "no_discount");
  }
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%id%}/, product.id);

  return output;
};
