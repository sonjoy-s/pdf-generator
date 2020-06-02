import {Component, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
      ref: {
        previewContainer: 'inputAddress',
        defaultFontSize: 16
      },
      value: '30 Willow / 154 Musgrave Avenue'
    },
    info: {
      style: {
        width: '20%',
        top: '80%',
        left: '70%',
        color: '#A48266',
        textAlign: 'left',
        fontSize: '12pt',
      },
      value: '<p>PLEASE JOIN ME</p><p>Tuesday 26 May 2020</p><p>04:56 pm - 04:56 pm</p>'
    },
    logo: {
      path: 'assets/images/LJ-Hooker1579831998.png'
    },
    background: {
      path: 'assets/images/e259d8c8-8335-4ad9-b0d4-d97211e72433.png'
    }
  };

  constructor() {
  }

  ngOnInit() {
    this.watchFontSize();
  }

  applyTextStyles(refDoc, item, x, y) {
    refDoc.setTextColor(item.style.color);
    refDoc.setFontSize(item.style.fontSize.replace('pt', ''));
    refDoc.text(item.value, x, y, {
      align: item.style.textAlign
    });
  }

  updateFontSize(reRender = false) {
    const container = document.getElementById('inputAddress');

    if (container.scrollWidth > container.clientWidth && this.template.address.value.length > 40) {
      const refFontSize = parseFloat(window.getComputedStyle(container).getPropertyValue('font-size'));

      this.template.address.style.fontSize = (refFontSize * container.clientWidth / container.scrollWidth) + 'px';

      if (!reRender) {
        this.updateFontSize(true);
      }
    } else {
      this.template.address.style.fontSize = this.template.address.ref.defaultFontSize + 'pt';
    }
  }

  watchFontSize() {
    const targetNode = document.getElementById('inputAddress');

    // Options for the observer (which mutations to observe)
    const config = {attributes: true, childList: false, subtree: false};

    // Callback function to execute when mutations are observed
    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-len') {
          this.updateFontSize();
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    // observer.disconnect();
  }

  formatContent(refDoc: jsPDF, data, position) {
    const container = document.createElement('div');
    const lineHeight = 15;
    let top = position.top;

    container.innerHTML = data.value;

    refDoc.setFontSize(data.style.fontSize.replace('pt', ''));
    refDoc.setTextColor('#A48266');

    const setFont = (inputValue) => {
      // setup config
      let startX = position.left;
      const fontSize = data.style.fontSize.replace('pt', '');

      refDoc.setFontSize(fontSize).setFontStyle('normal');

      const arrayOfNormalAndBoldText = inputValue.replace('</strong>', '<strong>').split('<strong>');

      arrayOfNormalAndBoldText.map((text, i) => {
        refDoc.setFontType('bold');

        if ( i % 2 === 0 ) {
          refDoc.setFontType('normal');
        }

        refDoc.text(text, startX, position.top);
        startX = startX + refDoc.getStringUnitWidth(text) * fontSize;
      });

      position.top += lineHeight;
    };

    container.childNodes.forEach((node: HTMLElement) => {
      if (node.nodeName === 'P') {
        setFont(node.innerHTML);
      } else {
        node.childNodes.forEach((li: HTMLElement) => {
          setFont('  * ' + li.innerHTML);
        });
      }
    });
  }

  generatePDF() {
    // window['html2canvas'] = html2canvas;

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
      // this.applyTextStyles(doc, this.template.info, 350, 350);

      this.formatContent(doc, this.template.info, {
        left: 350,
        top: 320,
      });

      // console.log(document.querySelector('.layer-text div'));

      // doc.fromHTML( 'Paranyan <b>loves</b> jsPDF', 35, 25);

      // doc.setTextColor('#A48266');
      // doc.fromHTML(document.querySelector('.layer-text').innerHTML, 35, 125);

      // doc.html(document.querySelector('.layer-text'), {
      //   callback: function (pdf) {
      //     pdf.save();
      //   }
      // });


      doc.save();
    });
  }
}
