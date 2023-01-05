import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.css']
})
export class ProductcrudComponent {
  ProductArray : any[] = [];
  currentStudentID = "";

  name: string ="";
  description: string ="";
  price: string ="";

  constructor(private http: HttpClient )
  {
    this.getAllProducts();
  }
  getAllProducts() {
    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData: any)=>
    {
      
        console.log(resultData);
        this.ProductArray = resultData.data;
    });
  }

  setUpdate(data: any)
  {
   this.name = data.name;
   this.description = data.description;
   this.price = data.price;
   this.currentStudentID = data._id;
  
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
 
    };
    
    this.http.patch("http://localhost:8000/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Updated")
        this.getAllProducts();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);


        alert("Product Deleted");
        this.getAllProducts();
  
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }

  register()
  {
 
    let bodyData = {
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
  };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Added Successfully")
         //this.getAllEmployee();
        this.name = '';
        this.description = '';
        this.price  = '';
        this.getAllProducts();
    });
  }
}

