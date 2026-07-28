import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { ResumeData } from '../types/resume';

export async function exportToPDF(elementId: string, filename: string = 'Resume.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);
}

export function exportToJSON(data: ResumeData, filename: string = 'Resume_Backup.json'): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToTXT(data: ResumeData, filename: string = 'Resume_Plain.txt'): void {
  const { personalInfo, experiences, education, skillCategories, projects } = data;
  let txt = `====================================================\n`;
  txt += `${personalInfo.fullName.toUpperCase()}\n`;
  txt += `${personalInfo.jobTitle}\n`;
  txt += `Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}\n`;
  if (personalInfo.linkedin) txt += `LinkedIn: ${personalInfo.linkedin} | `;
  if (personalInfo.github) txt += `GitHub: ${personalInfo.github}\n`;
  txt += `====================================================\n\n`;

  if (personalInfo.summary) {
    txt += `SUMMARY\n----------------------------------------------------\n`;
    txt += `${personalInfo.summary}\n\n`;
  }

  if (experiences.length > 0) {
    txt += `WORK EXPERIENCE\n----------------------------------------------------\n`;
    experiences.forEach(exp => {
      txt += `${exp.position} - ${exp.company} (${exp.startDate} to ${exp.current ? 'Present' : exp.endDate})\n`;
      exp.highlights.forEach(h => {
        txt += `• ${h}\n`;
      });
      txt += `\n`;
    });
  }

  if (education.length > 0) {
    txt += `EDUCATION\n----------------------------------------------------\n`;
    education.forEach(edu => {
      txt += `${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
    });
    txt += `\n`;
  }

  if (skillCategories.length > 0) {
    txt += `SKILLS\n----------------------------------------------------\n`;
    skillCategories.forEach(cat => {
      txt += `${cat.categoryName}: ${cat.skills.join(', ')}\n`;
    });
    txt += `\n`;
  }

  if (projects.length > 0) {
    txt += `PROJECTS\n----------------------------------------------------\n`;
    projects.forEach(p => {
      txt += `${p.name}: ${p.description}\n`;
      txt += `Technologies: ${p.technologies.join(', ')}\n`;
      p.highlights.forEach(h => txt += `• ${h}\n`);
      txt += `\n`;
    });
  }

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToHTML(elementId: string, filename: string = 'Resume.html'): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #1e293b; margin: 0; padding: 40px; background: #fff; }
    h1 { font-size: 28px; margin: 0 0 4px; color: #0f172a; }
    h2 { font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; color: #1e293b; }
    ul { padding-left: 20px; margin: 8px 0; }
    li { margin-bottom: 4px; }
  </style>
</head>
<body>
  ${element.innerHTML}
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
