const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64.split(',')[1]); 
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };
  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };
  
 export const base64ToFile = (base64: string, fileName: string): File => {
    const mimeType = base64.match(/data:(.*?);base64/)?.[1] || '';
    const blob = base64ToBlob(base64, mimeType); 
    return blobToFile(blob, fileName); 
  };