import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SecondPage} from "../second/second";
import {DatafetchProvider} from "../../providers/datafetch/datafetch";
import {RequestOptions, Headers, Http} from "@angular/http";
//import {listOptions} from "@ionic/app-scripts";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
username:string;
password:string;
addcomments:string;
comment:any=["anil","arpan","jayash"];
student_name:string;
student_batch:number;
student_year:string;
students:any;
all_students:any;
update:any;

  constructor(public navCtrl: NavController,public dataftech:DatafetchProvider,public http:Http) {
    this.getdata();
  }

  setdata(){
    this.update={
      name:this.username,
      password:this.password,
    }
    console.log("data sending");
    var headers=new Headers();
    headers.append('content-type','application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin','*');
    let options=new RequestOptions({headers:headers});

    this.http.post('https://ovik.herokuapp.com/well',JSON.stringify(this.update), options)
      .map(res=>res.json()).subscribe(data=>{
        console.log(data)
    },
    err=>{
       console.log("Error! : ");
    });

  }


  getdata(){
    this.dataftech.load().then((data)=>{
      this.students=data;
      this.all_students=this.students.students;

    })
  }
  addcomment()
  {
    this.comment.push(this.addcomments);
    this.addcomments="";
  }
  removeItem(){
    this.comment.pop(this.addcomments);
    }


  addstudent(){
    this.students.push({"name":this.student_name,"batch":this.student_batch,"year":this.student_year});
  }

  gotosecondpage()
  {
    if(this.username=="ovik"&&this.password=="123456")
    this.navCtrl.push(SecondPage,{"username":this.username});
  }

}
