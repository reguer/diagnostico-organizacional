import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportarDashboardPDF(elementId: string, nombreEmpresa?: string): Promise<void> {
  const elemento = document.getElementById(elementId);
  if (!elemento) throw new Error('Elemento no encontrado');

  const nombreArchivo = `diagnostico-${nombreEmpresa?.replace(/\s+/g, '-').toLowerCase() ?? 'organizacional'}-${new Date().toISOString().split('T')[0]}.pdf`;

  // Captura de alta resolución
  const canvas = await html2canvas(elemento, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#f8fafc',
    windowWidth: elemento.scrollWidth,
    windowHeight: elemento.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Formato A4 en mm
  const pdfWidth = 210;
  const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

  const pdf = new jsPDF({
    orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  let yOffset = 0;
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Si el contenido es más largo que una página, dividir en múltiples
  while (yOffset < pdfHeight) {
    if (yOffset > 0) pdf.addPage();

    pdf.addImage(
      imgData,
      'PNG',
      0,
      -yOffset,
      pdfWidth,
      pdfHeight
    );

    yOffset += pageHeight;
  }

  pdf.save(nombreArchivo);
}
