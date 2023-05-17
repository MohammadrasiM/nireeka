export const printContent = (ref, pageTitle = "") => {
  const divContents = ref.current.innerHTML;
  const a = window.open();
  a.document.write("<html>");
  a.document.write("<head>");
  a.document.write(
    '<link rel="shortcut icon" href="https://nireeka.com/favicon.ico" type="image/x-icon" />'
  );
  if (!!pageTitle) {
    a.document.write("<title>" + pageTitle + "</title>");
  }
  a.document.write("</head>");
  a.document.write("<body>");
  a.document.write('<script src="https://cdn.tailwindcss.com"></script>');
  a.document.write(divContents);
  a.document.write("</body></html>");
  a.document.close();
  setTimeout(() => {
    a.print();
  }, 300);
};
