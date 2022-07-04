import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-iyzipay',
  templateUrl: './iyzipay.component.html',
  styleUrls: ['./iyzipay.component.css'],
})
export class IyzipayComponent {
  name = 'Angular';
  @ViewChild('iframe') iframe: ElementRef;

  trustedHTML;
  constructor(private sanitizer: DomSanitizer) {
    this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(
      this.modalContent
    );
    setTimeout(() => {});
  }

  ngAfterViewInit(): void {
    this.setIframe(this.iframe);
  }

  modalContent = `<script type=\"text/javascript\">if (typeof iyziInit == 'undefined') {var iyziInit = {currency:\"TRY\",token:\"11f6a1e2-3b41-4720-9569-730001e61888\",price:12034.58,locale:\"tr\",baseUrl:\"https://sandbox-api.iyzipay.com\", merchantGatewayBaseUrl:\"https://sandbox-merchantgw.iyzipay.com\", registerCardEnabled:false,bkmEnabled:false,bankTransferEnabled:false,bankTransferRedirectUrl:\"https://test.apspls.com/api/odeme/iyziresponse/\",bankTransferCustomUIProps:{},creditCardEnabled:true,bankTransferAccounts:[],userCards:[],fundEnabled:true,memberCheckoutOtpData:{},force3Ds:false,isSandbox:true,storeNewCardEnabled:true,paymentWithNewCardEnabled:true,enabledApmTypes:[\"SOFORT\",\"IDEAL\",\"QIWI\",\"GIROPAY\"],payWithIyzicoUsed:false,payWithIyzicoEnabled:true,payWithIyzicoCustomUI:{},buyerName:\"Abdullah\",buyerSurname:\"BAĞLAN\",merchantInfo:\"\",buyerProtectionEnabled:false,hide3DS:false,gsmNumber:\"\",email:\"suruc@gmail.com\",checkConsumerDetail:{},subscriptionPaymentEnabled:false,ucsEnabled:true,metadata : {},createTag:function(){var iyziJSTag = document.createElement('script');iyziJSTag.setAttribute('src','https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1601541130580');document.head.appendChild(iyziJSTag);}};iyziInit.createTag();}</script><script type=\"text/javascript\">if (typeof iyziUcsInit == 'undefined') {var iyziUcsInit = {\"baseUrl\":\"https://sandbox-api.iyzipay.com\", \"ucsToken\":\"114bab3e-c604-4200-b4d8-5e66fe99b129\",\"scriptType\":\"UCS_CONSENT\",\"buyerProtectedMerchant\":false,\"maskedGsmNumber\":\"\",\"gsmNumber\":\"\",\"merchantName\":\"Sandbox Merchant Name - 62464\", createTag: function () {var iyziUcsJSTag = document.createElement('script'); iyziUcsJSTag.setAttribute('src', 'https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1601541130612'); document.head.appendChild(iyziUcsJSTag);}};if (typeof iyziInit == 'undefined') { iyziUcsInit.createTag(); }}</script>`;

  private setIframe(iframe: ElementRef): void {
    const win: Window = iframe.nativeElement.contentWindow;
    const doc: Document = win.document;
    doc.open();
    doc.write(this.modalContent);
    doc.close();
  }
}
