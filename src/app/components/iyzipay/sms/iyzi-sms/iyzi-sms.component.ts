import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';


@Component({
  selector: 'app-iyzi-sms',
  templateUrl: './iyzi-sms.component.html',
  styleUrls: ['./iyzi-sms.component.css']
})
export class IyziSmsComponent  {
  name = 'Angular';

  @ViewChild('iframe') iframe: ElementRef;

  trustedHTML;
    constructor(private sanitizer: DomSanitizer) {
        this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(this.modalContent);
        setTimeout(()=>{
          this.setIframe(this.iframe);
        })
  }

htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';

  modalContent = `<!doctype html><html lang="en"><head>    <title>iyzico Mock 3D-Secure Processing Page</title></head><body><form id="iyzico-3ds-form" action="https://sandbox-api.iyzipay.com/payment/mock/init3ds" method="post">    <input type="hidden" name="orderId" value="mock64-7127975743472898iyziord">    <input type="hidden" name="bin" value="405418">    <input type="hidden" name="successUrl" value="https://sandbox-api.iyzipay.com/payment/iyzipos/callback3ds/success/37">    <input type="hidden" name="failureUrl" value="https://sandbox-api.iyzipay.com/payment/iyzipos/callback3ds/failure/37">    <input type="hidden" name="confirmationUrl" value="https://sandbox-api.iyzipay.com/payment/mock/confirm3ds">    <input type="hidden" name="PaReq" value="66e28140-1079-4f29-81c6-0220c720620e"></form><script type="text/javascript">    </script></body></html>
`;

private setIframe(iframe: ElementRef): void {
    const win: Window = iframe.nativeElement.contentWindow;
    const doc: Document = win.document;
    doc.open();
    doc.write(this.modalContent);
    doc.close()
  }
}

