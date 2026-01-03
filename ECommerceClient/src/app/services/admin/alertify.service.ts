import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string, options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers){
      msg.dismissOthers();
    }
  }
  dismiss(){
    alertify.dismissAll()
  }
}
export class AlertifyOptions{
  messageType:AlertifyMessageType = AlertifyMessageType.Message;
  position:AlertifyPosition = AlertifyPosition.BottomRight;
  delay:number=3; 
  dismissOthers:boolean=false
}
export enum AlertifyMessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}
export enum AlertifyPosition{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomLeft="bottom-left",
  BottomCenter="bottom-center"
}
