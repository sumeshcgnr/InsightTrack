import { Component , NgZone, input} from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { userData } from '../../services/auth/userinteface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: userData = {displayName: '', email: '', photoURL: '', verified: false};

  constructor( public zone: NgZone, public router: Router, private authService: AuthService){
    console.log("HomeComponent constructor");
    this.user = authService.GetLoggedInUser();
    console.log("HomeComponent constructor : ", this.user);
    if (this.user.email == '' ){
      this.doLogout();
    }
  }

  ngOnInit(): void {
    
  }

  navigateToHome(){
    console.log("navigateToDashboard");
    this.zone.run(() => { this.router.navigate(['/home/dashboard']);});   
  }

  doLogout(){
    console.log("doLogout");
    this.onCloseLogOut();    
  }


  onCloseLogOut() {
    this.authService.doFirebaseLogout() 
    .then((res) =>{      
      this.zone.run(() => { this.router.navigate(['']); });
    }).catch((err) =>{
      console.log("doLogout failed : ",err);
    });
  }

}
