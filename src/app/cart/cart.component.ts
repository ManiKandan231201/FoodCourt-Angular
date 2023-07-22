import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  itemArray:any=[];
  hotelDetailsShow:any;
  hotelDetails:any;
  customerDetails:any;
  AddressDetails:any;


  // cart:boolean=false;
  iscartAdded:boolean=true;


  isShowAddress:boolean=false;



  itemPrice:any=[];
  itemsArray:any=[];
  itemTotal:number=0;
  totalPrice:number=0;
  deliverFee:number=43;
  count:any=[];
  details:any;
  dummy1:any=[];
  dummy2:any;
  dummyPrice:any=[];
  user:any;
  log:any;
  islogged:boolean=false;
  iserror:boolean=true;


  Address:FormGroup;
  isaddAdress:boolean=false;
  setTotalPrice:any;


  orderitemArray:any=[];
  orderArray:any=[];
  setOrderDetails:any=[];
  setItemQuantity:any=[];

  setHotelDetails:any;
  addressDetails:any=[];
  sendAddressDetails:any=[];
  AddressCount:any=0;
  isAddress:boolean=false;
  setsessionAdress:any;

  setAddtoCart:any=[];

  currentOrderDetails:any=[];

  addOffer:FormGroup;
  isAddOffer:boolean=false;
  offerPrice:any;
  offerTotal:any;

constructor(fb:FormBuilder,private router:Router, private dish:DatabaseService){

  this.Address=fb.group({
    yourAddress:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{15,30}$")]],
    DoorNo:['',[Validators.required,Validators.pattern("^[0-9]+\s*[a-zA-Z]?(\/[0-9]+\s*[a-zA-Z]?)?$")]],
    Landmark:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{2,10}$")]],
    District:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{3,10}$")]]
  });

  this.addOffer=fb.group({
    addOfferCouponId:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{3,15}$")]],
  });


  this.hotelDetailsShow=this.dish.sendCartHotelname();

  if(sessionStorage.getItem('isentered')=="true"){
    this.dish.sendAddress().subscribe(x=>{
      this.customerDetails=x;
      this.AddressDetails=this.customerDetails.Address;
      this.itemsArray=this.customerDetails.AddToCartDetails;
      this.currentOrderDetails=this.customerDetails.CurrentOrderAddress

      if(this.itemsArray==null){
        this.itemsArray=[];
      }
      if(this.currentOrderDetails==null || this.currentOrderDetails.length==0){
       this.isAddress=false;
      }
      else{
        this.isAddress=true;
      }
      this.cartUi();
      this.setAddtoCart=JSON.stringify(this.itemsArray);
      sessionStorage.setItem('dishes',this.setAddtoCart);
      if(this.itemsArray==null || this.itemsArray.length==0){
        this.iscartAdded=true;
      }
      else{
        this.iscartAdded=false;
      }
    })

  }

    this.itemArray=sessionStorage.getItem('dishes');
    this.itemsArray=JSON.parse(this.itemArray);
  if(this.itemsArray==null || this.itemsArray.length==0){
    this.iscartAdded=true;
  }else{
    this.cartUi();
  }




  this.log=sessionStorage.getItem('isentered');
    if(this.log ==null || this.log=="false"){
      this.islogged=false;
      this.iserror=true;
    }
    else{
    this.details=sessionStorage.getItem('isusername');
    this.dummy1=JSON.parse(this.details);
    this.user=this.dummy1.username;
      this.islogged=true;
      this.iserror=false;
      this.DeliveryAddress();
    }


    if(localStorage.getItem("isAddressAdded")=="false" || localStorage.getItem("isAddressAdded")==null){
      this.isAddress=false;
    }
    else{
      this.isAddress=true;
    }

    if(sessionStorage.getItem('offerTotal')!=undefined){
      this.offerTotal=sessionStorage.getItem('offerTotal');
      this.offerPrice=sessionStorage.getItem('offerPrice');
    }
    else{
      this.offerTotal=0;
      this.offerPrice=0;
    }
}

cartUi(){
  this.iscartAdded=false;
  this.itemTotal=0;
  for(var i=0;i<this.itemsArray.length;i++){
    this.itemPrice[i]=parseInt(this.itemsArray[i].dishPrice);
    this.dummyPrice[i]=parseInt(this.itemsArray[i].dishPrice)/parseInt(this.itemsArray[i].dishQuantity);
    this.itemTotal=this.itemTotal+parseInt(this.itemPrice[i]);
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
  this.setTotalPrice=JSON.stringify(this.totalPrice);
  sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);
}


home(){
  this.router.navigateByUrl("");
}
// ---------------------------------------------------------------------

minus(ind:number){
  this.itemTotal=0;
  this.itemsArray[ind].dishQuantity=this.itemsArray[ind].dishQuantity-1;
  if(this.itemsArray[ind].dishQuantity==0){
    this.itemsArray.splice(ind,1);
    this.dummy2=JSON.stringify(this.itemsArray);
    sessionStorage.setItem('dishes',this.dummy2);
    this.dummyPrice.splice(ind,1);
    this.count.splice(ind,1);
    if(this.itemsArray.length==1){
      this.itemTotal=this.itemsArray[0].dishPrice;
      console.log(this.itemTotal);
    }
    else if(this.itemsArray.length==0){
      this.iscartAdded=true;
      sessionStorage.removeItem('offerPrice');
      sessionStorage.removeItem('offerTotal');
      sessionStorage.removeItem('TotalCartPrice');
    }
    else{
      for(var i=0;i<this.itemsArray.length;i++){
        this.itemTotal=this.itemTotal+this.itemsArray[i].dishPrice;
      }
    }
  }
  else{
    this.itemsArray[ind].dishPrice=this.itemsArray[ind].dishQuantity*this.dummyPrice[ind];
    for(var i=0;i<this.itemsArray.length;i++){
      this.itemTotal=this.itemTotal+this.itemsArray[i].dishPrice;
    }
  }
  if(sessionStorage.getItem('isentered')=="true"){
    this.dish.getAddToCart(this.itemsArray);
  }
  this.setAddtoCart=JSON.stringify(this.itemsArray);
  sessionStorage.setItem('dishes',this.setAddtoCart);
  this.totalPrice=this.itemTotal+this.deliverFee;
  this.offerValue();
  this.setTotalPrice=JSON.stringify(this.totalPrice);
  sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);
}


plus(ind:number){
  this.itemTotal=0;
  this.itemsArray[ind].dishQuantity=this.itemsArray[ind].dishQuantity+1;
  this.itemsArray[ind].dishPrice=this.itemsArray[ind].dishQuantity*this.dummyPrice[ind];
  for(var i=0;i<this.itemsArray.length;i++){
    this.itemTotal=this.itemTotal+this.itemsArray[i].dishPrice;
  }
  if(sessionStorage.getItem('isentered')=="true"){
    this.dish.getAddToCart(this.itemsArray);
  }
  this.setAddtoCart=JSON.stringify(this.itemsArray);
  sessionStorage.setItem('dishes',this.setAddtoCart);
  this.totalPrice=this.itemTotal+this.deliverFee;
  this.offerValue();
  this.setTotalPrice=JSON.stringify(this.totalPrice);
  sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);

}


// ------------------------------------------------------------

DeliveryAddress(){
  this.isShowAddress=true;
}



homeAddress(addressData:any,addressType:any){
  this.dish.sendAddress().subscribe(x=>{
    this.customerDetails=x;
    this.AddressDetails=this.customerDetails.Address;

    if(this.AddressDetails==undefined || this.AddressDetails.length==0){

      if(addressType=="Home"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-house"
        }]
      }
      else if(addressType=="Work"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-briefcase"
        }]
      }
      else{
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-location-dot"
        }]
      }
      this.sendAddressDetails=this.addressDetails;
      this.dish.getAddress(this.addressDetails).subscribe(x=>{
        console.log(x);
      })
    }


    else{
      if(addressType=="Home"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-house"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];

      }
      else if(addressType=="Work"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-briefcase"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];
      }
      else{
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-location-dot"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];
      }
      this.dish.getAddress(this.sendAddressDetails).subscribe(x=>{
        console.log(x);
      })
    }

  })

  setTimeout(()=>{
    window.location.reload();
  },1000);

  this.close();
}


setAddress(ind:any){
  if(this.isAddress==false){

    this.dish.getCurrentOrderAddress(this.AddressDetails[ind]);
    alert("your Address is added for delivery");
    this.currentOrderDetails=this.AddressDetails[ind];
    this.isAddress=true;
  }
  else{
    this.isAddress=false;
    alert("your Address is removed from delivery Address");
    this.dish.getCurrentOrderAddress([]);
  }
}

Payment(){
  if(this.isAddress){
    for(var i=0;i<this.itemsArray.length;i++){
      this.orderitemArray[i]={
        dishName:this.itemsArray[i].dishName,
        dishQuantity:this.itemsArray[i].dishQuantity,
        dishPrice:this.itemsArray[i].dishPrice
    }
  }
  console.log(this.hotelDetailsShow);
  this.orderArray={
    hotelName:this.hotelDetailsShow.hotelname,
    hotelImage:this.hotelDetailsShow.hotelimage,
    orderItems:this.orderitemArray,
    orderAddress:this.currentOrderDetails,
    totalPrice:this.totalPrice
  }
  this.dish.getCartOrderDetails(this.orderArray);
  this.router.navigateByUrl("finalPayment");
  }
  else if(sessionStorage.getItem('isentered')==null || sessionStorage.getItem('isentered')=="false"){
    this.router.navigateByUrl("finalPayment");
  }
  else{
    alert("you must add your address before payment");
  }
}

addAdress(){
  this.isaddAdress=true;
}

close(){
  this.isaddAdress=false;
  this.isAddOffer=false;
}




hotelRoute(){
  this.dish.read_hotels().subscribe(x=>{
    this.hotelDetails=x;
    for(var i=0;i<this.hotelDetails.length;i++){
      if(this.hotelDetailsShow.hotelname==this.hotelDetails[i].hotelname){
        this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
        sessionStorage.setItem('hotelDetails',this.setHotelDetails);
        this.router.navigateByUrl("dishPage");
      }
    }

  });

}

showOffer(){
  this.isAddOffer=true
}

addOfferCoupon(addoffer:any){
  this.dish.read_hotels().subscribe(x=>{
    this.hotelDetails=x;
    for(var i=0;i<this.hotelDetails.length;i++){
      if(this.hotelDetailsShow.hotelname==this.hotelDetails[i].hotelname){
        var getOfferValue=this.hotelDetailsShow.offer;
        if(addoffer.addOfferCouponId==getOfferValue.toString().slice(14,getOfferValue.length)){
          this.offerPrice=getOfferValue.toString().slice(0,2);
          this.offerTotal=Math.round((this.totalPrice/100)*this.offerPrice);
          sessionStorage.setItem('offerTotal',this.offerTotal);
          sessionStorage.setItem('offerPrice',this.offerPrice);
          this.totalPrice=this.totalPrice-this.offerTotal;
        }
        else{
          alert("Invalid coupon code!");
        }
      }

    }
  })
}

// this block is used to calculate the offer
 offerValue(){
  if(this.itemsArray.length>=1){
    this.offerTotal=Math.round((this.totalPrice/100)*this.offerPrice);
    sessionStorage.setItem('offerTotal',this.offerTotal);
    this.totalPrice=this.totalPrice-this.offerTotal;
    this.setTotalPrice=JSON.stringify(this.totalPrice);
    sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);
  }

 }
}
