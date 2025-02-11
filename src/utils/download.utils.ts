import toast from 'react-hot-toast'

export const handleFileDownload = (temp_link: string) => {
  const anchor = document.createElement('a');
  anchor.href = temp_link;
  anchor.download = ''; // Specify the filename or leave blank for default from server
  anchor.style.display = 'none'; // Hide the anchor element
  document.body.appendChild(anchor); // Append to the DOM
  anchor.click(); // Trigger the download
  document.body.removeChild(anchor); // Clean up after download
};


export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Message copied to clipboard')
};