import {Component} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  template = {
    address: {
      style: {
        fontSize: '16pt',
        color: '#ffffff',
        top: '63.5%',
        left: '25%',
        transform: 'rotate(-12deg)',
        transformOrigin: '50% 50%',
        width: '45%',
        textAlign: 'center',
      },
      value: '30 Willow / 154 Musgrave Avenue'
    },
    info: {
      style: {
        width: '20%',
        top: '80%',
        left: '70%',
        color: '#A48266',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: '12pt',
      },
      value: 'PLEASE JOIN ME\nTuesday 26 May 2020\n04:56 pm - 04:56 pm'
    }
  };

  constructor() {
  }

  applyTextStyles(refDoc, item, x, y) {

    refDoc.setTextColor(item.style.color);
    refDoc.setFontSize(item.style.fontSize.replace('pt', ''));
    refDoc.text(item.value, x, y, {
      align: item.style.textAlign
    });
  }

  generatePDF() {
    const ratio = 0.75;
    const div = document.getElementById('html2Pdf');
    const options = {background: 'white', height: div.clientHeight, width: div.clientWidth};
    const width = 595.28;
    const height = 419.53;

    html2canvas(div, options).then((canvas) => {
      const doc = new jsPDF({
        orientation: 'l',
        unit: 'pt',
        format: [height, width]
      });

      const imgData = canvas.toDataURL('image/PNG');

      doc.addImage(imgData, 'PNG', 0, 0, width, height);

      this.applyTextStyles(doc, this.template.address, 300, 260);
      this.applyTextStyles(doc, this.template.info, 550, 350);

      doc.save();
    });
  }
}
