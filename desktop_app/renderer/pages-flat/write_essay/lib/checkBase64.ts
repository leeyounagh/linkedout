export const isBase64 = (str: string| null) => {
    if(typeof str === "string")
    return str.startsWith('data:') && str.includes(';base64,');
  };