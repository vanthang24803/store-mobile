export const formatPrice = (price, sale) => {
    return (Number(price) - (Number(price) * Number(sale)) / 100).toLocaleString(
      "de-DE"
    );
  };
  
  export const price = (price) => {
    return Number(price).toLocaleString("de-DE");
  };
  
  export const formatString = (text) => {
    let lines = text?.split("<br/>");
    let newText = lines?.map((line, index) => `p key=${index}>${line}</p>`);
  
    return newText;
  };